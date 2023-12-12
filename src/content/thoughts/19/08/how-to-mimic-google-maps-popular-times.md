---
title: "How to Mimic Google Maps Popular Times"
description: "How to mimic Google Maps Popular Times to track live and averaged visit data using Amazon AWS, Nodejs and GraphQL."
date: 2019-08-08T00:00:00-04:00
image: "https://sam-bossley-us-media.sfo3.cdn.digitaloceanspaces.com/thoughts/2019/mimic-google-histogram.png"
tags:
  - "tech"
  - "ecmascript"
  - "aws"
  - "graphql"
---

> I originally wrote this as a series of articles on Medium under the name "How to mimic Google Maps Popular Times to track live and averaged visit data using Amazon AWS, Nodejs and GraphQL". I have decided to move the content over to this website for consolidation of content. I have avoided alteration of the original content except where alteration was necessary.

## Part 1

![A snapshot of the garage status histogram I created.](https://sam-bossley-us-media.sfo3.cdn.digitaloceanspaces.com/thoughts/2019/mimic-google-histogram.png)

It's pretty cool to be able to show how busy a place is at the present moment.

It's even cooler to be able to compare how busy a place is at the present moment with how busy it is on average.

Google Maps does exactly that with its Popular Times graph. Google Maps utilizes users' phone location data and manages to draw reasonable conclusions about the average popularity of a location at a given time. They are able to estimate how busy a place is just by analyzing how many people are there.

[Popular Times graph](https://support.google.com/business/answer/6263531?hl=en)

How do they do that?

I happened to find myself stumbling along the same question this summer. I was given a source that reports the current number of cars within a parking garage and told to generate data similar to Google's Popular Times.

Regrettably, none of Google's Popular Times code is available to the public, so I had to play it by ear and come up with my own ideas.

In order to tackle this problem, I'm going to simplify the situation: Imagine you own a restaurant and you'd like to display the "popular times" of the restaurant in a given week. As part of the situation, I'm making the assumption that at any given moment, you can count the number of individuals in the restaurant.

We need an API endpoint, or data access point, that can produce the current popularity of the restaurant, as well as the average popularity of the restaurant on any day and at any time.

Before you start opening VS Code and cracking your knuckles, it's easier to first brainstorm a basic concept of the solution. First, what information is given? You know that at any moment, you can record the count of people in the restaurant.

To get the current count of people, all we need to do is record the count of people.

Things start to get tricky when dealing with averages. In any math problem, the only way to record an average number is to have multiple numbers to average together. We're only given a count, so we need to save the counts at different times in order to display some sort of average. Since we want to show the average for any day, hour, or minute, we should record the count of people every minute and put it into a data table. I'll call this table the "status table" for convenience because it is recording the "status" of the restaurant, and the status is simply the count at the current time. We can then average this data and produce something similar to the histogram above.

Now let's get to outliers. Let's say that Lizzo is performing in the bar next door and the restaurant is packed, more than it ever will be any other day of the year. A single night of extremely high counts could offset the averages for months. The purpose of the averages is to display relevant data, and last year's performance is irrelevant. When I'm deciding whether to go to a restaurant, I don't care how busy it was last year.

At this point, we need to decide when a count becomes irrelevant. In my case, I made an executive decision and chose 5 weeks to be considered relevant. Anything older than 5 weeks is more a month old and not an accurate representation of how busy a place is (events and season changes can skew count data drastically). So any recorded count older than 5 weeks old should be deleted from the status table.

It's good to do a little math exercise here. Since we know the status table will hold a maximum of 5 weeks of data, we can count how many items will be in the table at a given time. If the status is being recorded every minute,

```
1 status/min * 60 min/hr * 24 hrs/day * 7 days/week * 5 weeks
```

= at least 50,400 statuses or more will be in the table at any given time. This is a useful calculation because we can check our math in the implementation.

Ok, there's now five weeks of counts recorded every minute in a table. How do we average it? Well, since each record has some sort of timestamp, we know what day, hour, and minute it was recorded. There's no point in trying to show the average of every minute of the week — no one cares how busy the restaurant is at 6:03 pm. I made another decision here to display averages in fifteen-minute intervals, or 4 intervals per hour. There's a big difference between 6:00 and 6:15, but not as much of a difference between 6:00 and 6:01.

In that case, the averages should be recorded based on day, hour, and interval, so it doesn't matter what week it was recorded. To average the statuses, we can group them by day, hour, and interval. All records in the status table with that specific day, hour, and interval will be averaged together. We'll then store this averaged item in another data table, called the "average table".

The average table will contain one record for each interval in an hour for each day of the week. Remember, it doesn't matter what week it is in the average table. Every time an average is put into the table, if one already exists with that day, hour, and interval, we can just overwrite, or update, the old average and put it back in the table.

Here's where efficiency kicks in — At any given time, the only value in the average table changing from moment to moment is the value with the same day, hour, and interval number as the current time. This means that every time we update the averages, we only need to update one entry at any given time. This efficiency can be improved even further by realizing that because the entries constantly changing, we don't need to recalculate them every minute. Instead, we can choose to only calculate the average value every 10 minutes, reducing function runtime and still showing an accurate average.

Once again, a little math can't hurt.

```
1 status/interval * 4 intervals/hr * 24 hrs/day * 7 days/week
```

= at least 672 average statuses in the average table at any given time. We'll check all this math later in the implementation.

There's still something missing. We have all these counts but we don't know what to do with them. A count number is not tangible to an end user, but a percentage is. This is why Popular Times is so useful — it doesn't just display the amount of people at a location, it displays a bar representing the fullness percentage.

The best way to get a percentage from a count is to get the maximum capacity and divide each count by the capacity. To get the maximum capacity, we can just look through the status table and get the status with the highest count. After all, the maximum count is relative, so this value will change as the status table changes. Once we have this value, we can calculate the percentage fullness for each average status.

We now have averages and we know how to get the current status. Any time someone wants to know how busy the restaurant is, we can retrieve the current status, and all the average statuses, and display each status in a percentage bar histogram.

So here it all is, in a summary: Every minute, we are recording the live count, in addition to the day and time at which it was recorded. This is all being stored in a status table. Every 10 minutes, this data is separated into groups based on the day, hour, and 15 minute interval at which it was recorded. The counts of all these data points are averaged into a single average count and capacity with the same date and time, and the resulting average is stored in a second table. At the same time, any record in the status table older than 5 weeks is deleted from the table.

This is where we get to our coding implementation (part 2).

## Part 2

In the previous part I provided my thought process of how I designed a popular times histogram. In this part we'll get started implementing our ideas into code.

From this point forward I'm making the assumption that we're tracking the status of multiple restaurants. This way our lambdas can be extended easily if we wanted to start recording the status of an additional restaurant.

I'll be using DynamoDB to store all data and AWS Lambdas to provide the functionality. Since Lambdas can be run using CloudWatch cron events, it makes schedule-dependent functionality much easier to implement.

We'll make three tables — a status table to store all statuses within the 5 week range, an accumulated table to store all statuses ever recorded, and an average table to store the status averages.

First, let's create a SAM template template.yaml in our project's root directory to define our global parameters:

```yaml
AWSTemplateFormatVersion: 2010-09-09
Transform: AWS::Serverless-2016-10-31
Description: status monitor

Parameters:

  TableMain:
    Type: String
    Default: StatusTable
  TableAccumulated:
    Type: String
    Default: AccumulatedTable
  TableAveraged:
    Type: String
    Default: AveragedTable
  NumWeeksInAvg:
    Type: Number
    Default: 5
  NumHourIntervals:
    Type: Number
    Default: 4
```

What we're doing here is making global stack parameters so we can easily change our application later on. The first three parameters simply hold the names of the tables, while the last two correspond to the number of weeks to average and the number of intervals to record in an hour, respectively.

Now let's set up those globals.

```yaml
...

Globals:

  Function:
    MemorySize: 128
    Runtime: nodejs8.10
    Timeout: 60
    Environment:
      Variables:
        TABLE_MAIN: !Ref TableMain
        TABLE_ACCUMULATED: !Ref TableAccumulated
        TABLE_AVERAGED: !Ref TableAveraged
        NUM_WEEKS_IN_AVG: !Ref NumWeeksInAvg
        NUM_HOUR_INTERVALS: !Ref NumHourIntervals
```

This sets defaults such as memory usage and Nodejs version for lambda execution. The environment variables passes the global variables we stated earlier to the lambdas as process.env variables.

Next, we'll start defining resources. The goal of these lambdas is to be able to produce a REST API endpoint from which we can retrieve the data. We'll set this up now.

```yaml
...

Resources:

  StatApi:
    Type: AWS::Serverless::Api
    Properties:
      StageName: Prod
  CDN:
    Type: AWS::CloudFront::Distribution
    DependsOn:
      - StatApi
    Properties:
      DistributionConfig:
        DefaultCacheBehavior:
          AllowedMethods:
            - DELETE
            - GET
            - HEAD
            - OPTIONS
            - PATCH
            - POST
            - PUT
          ForwardedValues:
            Headers:
              - Accept
              - Referer
              - Authorization
              - Content-Type
            QueryString: true
          TargetOriginId: cloudfrontdist
          ViewerProtocolPolicy: redirect-to-https
        Origins:
          - DomainName: !Sub ${StatApi}.execute-api.${AWS::Region}.${AWS::URLSuffix}
            Id: cloudfrontdist
            CustomOriginConfig:
              OriginProtocolPolicy: https-only
            OriginPath: /Prod
        Enabled: true
  CDNOriginAccessIdentity:
    Type: AWS::CloudFront::CloudFrontOriginAccessIdentity
    Properties:
      CloudFrontOriginAccessIdentityConfig:
        Comment: !Sub ${AWS::StackName}-CDN-OAIConfig
```

We're creating a serverless API endpoint and setting up a Cloudfront distribution to serve our API.

Let's start defining our tables. I'll start with the status table:

```yaml
Resources:

  ...

  StatTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Ref TableMain
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: N
        - AttributeName: count
          AttributeType: N
        - AttributeName: day
          AttributeType: N
        - AttributeName: hour
          AttributeType: N
        - AttributeName: ttl
          AttributeType: N
      KeySchema:
        - AttributeName: id
          KeyType: HASH
        - AttributeName: ttl
          KeyType: RANGE
      GlobalSecondaryIndexes:
        - IndexName: IdCount
          KeySchema:
            - AttributeName: id
              KeyType: HASH
            - AttributeName: count
              KeyType: RANGE
          Projection:
            ProjectionType: ALL
          ProvisionedThroughput:
            ReadCapacityUnits: 1
            WriteCapacityUnits: 1
        - IndexName: DayHour
          KeySchema:
            - AttributeName: day
              KeyType: HASH
            - AttributeName: hour
              KeyType: RANGE
          Projection:
            ProjectionType: ALL
          ProvisionedThroughput:
            ReadCapacityUnits: 1
            WriteCapacityUnits: 1
      BillingMode: PROVISIONED
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
      TimeToLiveSpecification:
        Enabled: true
        AttributeName: ttl
```

This seems a lot more complicated than I originally thought!

Let me explain what's going on here. First, we're creating a DynamoDB table referencing the name we gave the status table in the Parameters section. Each status stored in this table has a primary key id and a sort key lastUpdated. If we are monitoring multiple restaurants, it becomes much easier to search statuses by restaurant id. The TimeToLiveSpecification property is AWS' version of an expiration date. AWS looks for any records with an older epoch date than the current epoch date and generally deletes those items within 48 hours of expiration. We will set the expiration date of each status to 5 weeks in the future so each status will be deleted in 5 weeks. Since AWS does all the heavy lifting and helps us delete statuses, we can easily locate any statuses older than 5 weeks via an expiration date.

[How It Works: DynamoDB Time To Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/howitworks-ttl.html)

We also specify two global secondary indexes. The purpose of IdCount is to find max counts efficiently. While computing percentages, we can easily sort by count and find the biggest count. The second index DayHour allows us to average by day and hour so we don't have to worry about averaging every single status every 10 minutes. Both GSIs increase performance exponentially and reduce lambda runtimes from approximately ten minutes to approximately ten seconds.

The accumulated table is similar to the status table, but since its purpose is only to record all statuses as a fallback, we don't need any fancy indexes here:

```yaml
Resources:

  ...

  StatAccTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Ref TableAccumulated
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: N
        - AttributeName: lastUpdated
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
        - AttributeName: lastUpdated
          KeyType: RANGE
      BillingMode: PROVISIONED
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 1
```

Easy enough, right? Let's do the average table:

```yaml
Resources:

  ...

  StatAvgTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Ref TableAveraged
      AttributeDefinitions:
        - AttributeName: type
          AttributeType: S
        - AttributeName: index
          AttributeType: S
      KeySchema:
        - AttributeName: type
          KeyType: HASH
        - AttributeName: index
          KeyType: RANGE
      BillingMode: PROVISIONED
      ProvisionedThroughput:
        ReadCapacityUnits: 1
        WriteCapacityUnits: 3
      TimeToLiveSpecification:
        Enabled: true
        AttributeName: ttl
```

The average table looks much different from the other two. The average table is essentially storing two tables in one table. Remember how I said that we would be monitoring multiple restaurants? We also need to store the ids of all existing restaurants in a table, so we can easily query a list of available restaurant ids. I decided against storing the available ids in a separate table due to the fact that it makes computations more complex and performance expensive in the long run. I also made the assumption that there are not many restaurants we are tracking. Instead, I formatted the average table to store both available ids and averaged statuses. I prefer this approach because it places all query data in one table, making it faster and easier to retrieve data from the endpoint.

It works like this: the primary key type stores a string signifying whether it is an available id or an average. The sort key then takes the effective role of the primary key, containing an id and a date index. We'll go into this in more depth when we write the code for the average lambda.

The table also contains a TimeToLiveSpecification to make it easy to delete old expired items in a table. If you remember, the average table will keep a consistent number of items within the table at all times. In the case that a restaurant is removed from the list of available ids, that id will eventually be deleted when it ages past 5 weeks.

> Note that the write capacity for main index is 3, much higher than any of the other capacities. This is because every 10 minutes average statuses are pushed to the table in batches, increasing the write throughput.

Now I'll begin to describe the lambdas themselves. After much consideration, I've broken the core logic of the status histogram into three lambdas: updateStatus, updateStatusAveraged, and statusOverview. The purpose of updateStatus is simply to record the count status data into the status table. This is running every minute. updateStatusAveraged is scheduled to run every 10 minutes and performs all the expensive computations, calculating the averages from multiple statuses, then storing the averages (and available ids) in the average table. The last lambda, statusOverview, is meant to act as the REST API endpoint. We'll integrate GraphQL with this endpoint later in the series.

And now, the lambdas themselves.

```yaml
Resources:

  ...

  UpdateStatFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./
      Handler: src/updateStatus/index.handler
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref StatTable
        - DynamoDBCrudPolicy:
            TableName: !Ref StatAccTable
      Events:
        UpdateStatSched:
          Type: Schedule
          Properties:
            Schedule: rate(1 minute)
  
  UpdateStatAvgFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./
      Handler: src/updateStatusAveraged/index.handler
      MemorySize: 256
      Timeout: 300
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref StatTable
        - DynamoDBCrudPolicy:
            TableName: !Ref StatAvgTable
      Events:
        UpdateStatAvgSched:
          Type: Schedule
          Properties:
            Schedule: rate(10 minutes)  StatOverviewFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ./
      Handler: src/statusOverview/index.handler
      Policies:
        - AmazonDynamoDBReadOnlyAccess
      Events:
        StatOverviewApi:
          Type: Api
          Properties:
            RestApiId: !Ref StatApi
            Path: /
            Method: POST
```

As you can figure out, we need to create these lambdas. Create a src folder in the main directory, followed by a folder for each of the four lambdas. Each folder should contain an index.js file.

Finally, we include the output endpoint:

```yaml
...

Outputs:

  StatApiEndpoint:
    Description: API endpoint url
    Value: !Sub https://${StatApi}.execute-api.${AWS::Region}.${AWS::URLSuffix}/Prod/

  StackCDN:
    Description: CloudFront Distribution
    Value: !GetAtt CDN.DomainName
```

The project directory should look like this:

```
ROOT /
  src/
    deleteOutdated/
      index.js
    statusOverview/
      index.js
    updateStatus/
      index.js
    updateStatusAveraged/
      index.js
  template.yaml
```

In part 3 we will write a few core functions to help us communicate with DynamoDB more effectively.

## Part 3

So you've went through the thought process. You've written the SAM template. You've even organized your files to look nice. Let's finally start coding some real stuff.

In the previous part we wrote a SAM template to describe all of our global variables and resources we would be using. In this part I'm going to create a few core functions that will help in communicating with DynamoDB. These functions will make it easier and cleaner to query from a table, or write to a table.

First, let's get started by installing the aws-sdk and node-fetch packages in the root directory. Type the following in the command line to create a new package:

```sh
npm init
```

You can answer the prompts however you like. We're more concerned with dependencies. To install the dependencies:

```sh
npm i aws-sdk node-fetch
```

Both of these commands should generate package.json and package-lock.json files.

We're going to make another file in the src directory called core.js. This will hold all of our essential functions. Let's start by importing some important variables:

```javascript
exports.fetch = require('node-fetch');

exports.NUM_HOUR_INTERVALS = process.env.NUM_HOUR_INTERVALS || 4;
exports.NUM_WEEKS_IN_AVG = process.env.NUM_WEEKS_IN_AVG || 5;
exports.MAX_NUM_BATCH_ITEMS = 25;
exports.ERROR_THRESHOLD = 3;
```

The docClient is how most transactions with DynamoDB will occur. We also declare some constants. NUM_HOUR_INTERVALS and NUM_WEEKS_IN_AVG are taken directly from the template.yaml file as global variables. MAX_NUM_BATCH_ITEMS is the maximum number of items DynamoDB is able to process in a batchWrite request. I don't anticipate Amazon changing this number any time soon. I simply put it as a global variable to keep with the DRY principle as we'll be using this number in a few functions.

We'll start with a queryTable function:

```javascript
...

exports.queryTable = async (params, recursiveEvaluate = true) => {
  let _data = [], _errors = [];
  let queryParams = params;

  do {
    try {
      let query = await this.docClient.query(queryParams).promise();

      queryParams.ExclusiveStartKey = null; // reset start key

      if (query.LastEvaluatedKey && recursiveEvaluate) {
        queryParams.ExclusiveStartKey = query.LastEvaluatedKey;
      }

      _data = [..._data, ...query.Items];

    } catch(e) {
      _errors.push({ message: 'unable to query table', error: e });
    }

  } while (queryParams.ExclusiveStartKey &&
    _errors.length < this.ERROR_THRESHOLD);

  return {
    message: `Table ${params.TableName} queried.`,
    data: _data,
    errors: _errors,
  };
}
```

This function is essentially a glorified DynamoDB query. The reason I've made this as a completely separate function is because it accounts for DynamoDB pagination. Any DynamoDB query or scan only returns the first 1 Mb of data or less. This means that we won't get back all data at once and will have to keep querying the table until we have retrieved all data. The function queryTable not only returns all paginated results, but handles errors as well. I've made it so the function returns a standard "message data error" object, so it handles errors gracefully. The data and errors properties will be returned as arrays of objects.

[Working with queries in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.Pagination)

In addition to providing the DynamoDB query parameters as an argument, I've also included a boolean recursiveEvaluate, which defaults as true. Since I've made a loop to query through every page of results, providing a limit option in the query parameters will be ignored. When retrieving max counts, we only want the maximum value, which means we will query with a limit of 1. When false, the function will only return 1 Mb of data or less (in this case, it will return only one record).

In the case that the function produces errors, I've made an ERROR_THRESHOLD where errors can still be produced as long as they are below the threshold. In this case, if there are more than 3 errors while querying for table items, the function will return prematurely. I chose to not force the function to return immediately after the first error because in the case that the query fails for the first 1 Mb but works properly for the next 50 Gb, it is better to return the data that was returned and simply return the caught error with the successful data rather than stopping the operation completely.

Similar to the previous function, scanTable follows the same format of pagination and error handling:

```javascript
...

exports.scanTable = async (params, recursiveEvaluate = true) => {
  let _data = [], _errors = [];
  let scanParams = params;

  do {
    try {
      let scan = await this.docClient.scan(scanParams).promise();

      scanParams.ExclusiveStartKey = null; // reset start key

      if (scan.LastEvaluatedKey && recursiveEvaluate) {
        scanParams.ExclusiveStartKey = scan.LastEvaluatedKey;
      }

      _data = [..._data, ...scan.Items];

    } catch(e) {
      _errors.push({ message: 'unable to scan table', error: e });
    }

  } while (scanParams.ExclusiveStartKey && 
    _errors.length < this.ERROR_THRESHOLD);

  return {
    message: `Table ${params.TableName} scanned.`,
    data: _data,
    errors: _errors,
  };
}
```

Just like the previous function, scanTable will return the results as an array of objects.

Next, we'll provide a function to batch write items. This is essential because we'll be moving large quantities of data to and from the tables, and batch writes are much more efficient than individual put and delete requests.

```javascript
...

exports.batchWriteItems = async (params) => {
  let _errors = [];

  const isObjEmpty = (obj) =>
    Object.entries(obj).length === 0 &&
    obj.constructor === Object;

  let unprocessedItems = {};

  do {
    try {
      let data = await this.docClient.batchWrite(params).promise();

      unprocessedItems = data.UnprocessedItems || {};

    } catch(e) {
      _errors.push({ message: 'unable to batch write', error: e });
    }

  } while (!isObjEmpty(unprocessedItems));

  return {
    message: `Batch write completed.`,
    errors: _errors,
  };
}
```

Given a parameter object with batch requests, the function continues to process the requests as long as there are unprocessed items. In this function I chose not to implement an error threshold because in the case of a failure, it is likely due to small throughput or timeout, and continuing the process will only fail again.

The function's counterpart, processBatchRequests, go hand in hand:

```javascript
...

exports.processBatchRequests = async (table, requests) => {
  let _errors = [];
  let arr = requests;

  while (arr.length > 0 &&
    _errors.length < this.ERROR_THRESHOLD) {

    let currentBatch = arr.slice(0, this.MAX_NUM_BATCH_ITEMS);
    let batchParams = { RequestItems: { [table]: currentBatch } };

    try {
      let response = await this.batchWriteItems(batchParams);

      _errors.push(...response.errors);
      arr = arr.slice(this.MAX_NUM_BATCH_ITEMS);
    } catch(e) {
      _errors.push({
        message: 'unable to await batch writes', error: e });
    }
  }

  return {
    message: `Batch write of ${requests.length} items to ${table}.`,
    errors: _errors,
  };
}
```

This function takes a table name and an arbitrary number of requests. Whereas batchWriteItems simply calls a batch write operation on the items given, processBatchRequests takes all batch requests and calls batchWriteItems to process them. It uses MAX_NUM_BATCH_ITEMS to split the requests into groups of 25 and batch write each group. We will never call batchWriteItems directly in the lambdas, only processBatchRequests will be called.

Now for more implementation-specific functions:

```javascript
...

exports.genExpirationTTL = (date) => {
  let expirationDate = new Date(date);
  expirationDate.setDate(
    expirationDate.getDate() + 7 * this.NUM_WEEKS_IN_AVG
  );
  return Math.floor(expirationDate.getTime() / 1000);
}
```

What we're doing above is generating an expiration date from a given date. This method returns an epoch time 5 weeks in advance from the given date. This method is useful in the following method:

```javascript
...

exports.createDateObj = (date) => ({
  ttl: this.genExpirationTTL(date),
  day: date.getDay(),
  hour: date.getHours(),
  interval: Math.floor(date.getMinutes() /
    (60 / this.NUM_HOUR_INTERVALS)),
});
```

Since all of our status recording is based around timestamps and dates, we'll be recording ttl, day, hour, and interval on each status. The function createDateObj just makes calculating each property easier to do, given a Javascript Date object. Note that interval is calculated to be zero-based numbering — since we plan on displaying 4 intervals, the intervals will be numbered between 0 and 3. This is mostly done for consistency as the day and hour properties are numbered between 0 to 6 and 0 to 23 respectively.

Finally, we'll add a function to get the current data. I called this formatCurrentData because it takes the data from a REST API and formats it into data we can use. Your implementation may be different depending on how data is being retrieved.

```javascript
...

exports.formatCurrentData = async () => {
 let _data = [], _errors = [];

 try {
    let response = await this.fetch(YOUR_REST_API_HERE)
      .then((res) => res.json());

    _data = response || [];
  } catch(e) {
    _errors.push({
      message: 'unable to retrieve current data',
      error: e
    });
  }

  let date = this.createDateObj(new Date());

  _data = _data.map((i, index) => ({
    ...i,
    ...date,
    id: i.id || index,
    name: i.name || `${index}`,
    count: i.count || 0,
  }))

  return {
    message: 'formatted current data.',
    data: _data,
    errors: _errors,
  };
}
```

As usual, we return a response object containing data and errors.

All of these functions we wrote are simply to help make communicating with the DynamoDB tables and retrieving data a lot easier.

In the next part we'll use the core functions we just wrote to write our first lambda.

## Part 4

Let's finally write some lambdas!

We'll start by coding the updateStatus lambda, which is called every minute and records the current status into the status table.

In src/updateStatus/index.js:

```javascript
const core = require('../core');

const { TABLE_MAIN, TABLE_ACCUMULATED } = process.env;

exports.handler = async (e, cxt, cb) => {
  let _errors = []; let current = [];

  try {
    let response = await core.formatCurrentData();
    _errors.push(...response.errors);

    current = response.data;

  } catch(e) {
    _errors.push({
      messages: 'unable to fetch current data',
      error: e
    });
  }

  let putRequests = current.map((i) =>
    ({ PutRequest: { Item: i } }));

  if (putRequests.length > 0) {
    try {
      let processMain =
        core.processBatchRequests(TABLE_MAIN, putRequests);

      let processAccumulated =
        core.processBatchRequests(TABLE_ACCUMULATED, putRequests);

      await Promise.all([processMain, processAccumulated]);

    } catch(e) {
      _errors.push({
        messages: 'unable to process batch requests',
        error: e
      });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${TABLE_MAIN} and ${TABLE_ACCUMULATED} updated as of ${new Date()}`,
      errors: _errors,
    }),
  };
}
```

Simple enough, right? Our handler uses the formatCurrentData function we wrote previously to retrieve the latest status. Then, with the help of processBatchRequests, it creates batch requests from the statuses and writes them to both the status table and the accumulated table. The table names are taken from process.env and set by our template.yaml file.

The averaging lambda updateStatusAveraged is going to be a bit more work. In src/updateStatusAveraged/index.js:

```javascript
const core = require('../core');
const { TABLE_MAIN, TABLE_AVERAGED } = process.env;
```

We need to make a function that will create averages from regular data. Inside that function, we need to group items so we know what to average. If we don't group the items by their respective id, day, hour, and interval, we will end up averaging random statuses together. Using the help of the reduce function we can make this easier:

```javascript
...

exports.groupByInterval = (arr) => {
  return arr.reduce((accumulator, val) => {
    const { id, day, hour, interval } = val;

    let key = `${id}_${day}_${hour}_${interval}`;

    if (!accumulator[key]) {
      accumulator[key] = [];
    }

    accumulator[key].push(val);

    return accumulator;
  }, {});
}
```

Woah, what did we just do? Array.prototype.reduce() combines the elements of an array into an accumulated value. Since we don't want to put everything into a single value and instead only want to group by id, day, hour, and interval, we're instead accumulating everything into an object. Each individual group has a unique id_day_hour_interval key, and each group contains an array of all items to average. If you're having trouble picturing this, here's what the result might look like:

```json
// where keys are organized as "id_day_hour_interval"
{
  "1_0_0_0": [...],
  "1_0_0_1": [...],
  "1_0_0_2": [...],
  "1_0_0_3": [...],
  "1_0_1_0": [...],
  "1_0_1_1": [...],
  "1_0_1_2": [...]
}
```

Now that we have an object holding our groups to average, we can just iterate through each of the object keys and average the data.

If you recall from part 2, we're going to store both averages and available ids in the average table. For this to work, we needed a type unique identifier, remember? In generateAvgPutRequests I take the current hour's statuses, group them by interval, and return an array of average and available id put requests.

```javascript
...

exports.generateAveragePutRequests = (data) => {
  let putRequests = [];

  let groupedItems = this.groupByInterval(data);

  for (let key in groupedItems) {
    let arrayToAverage = groupedItems[key];

    if (arrayToAverage.length > 0) {

      // get most recent object
      let recent = arrayToAverage[arrayToAverage.length - 1];
      const { id, name, lastUpdated, day, hour, interval } = recent;

      let count = arrayToAverage
        .map((i) => i.count)
        .reduce((result, i) => result + i);
      count = Math.round(count / arrayToAverage.length);

      // averages
      putRequests.push({
        PutRequest: {
          Item: {
            type: 'AVG',
            index: `${id}_${day}_${hour}_${interval}`,
            name,
            // update expiration date
            ttl: core.genExpirationTTL(new Date()),
            day, hour, interval,
            count,
          },
        },
      })

      let avail = putRequests.filter((i) =>
        i.PutRequest.Item.index === `${id}`);

      // if available id doesn't already exist as a put request
      if (avail.length == 0) {

        // available ids
        putRequests.push({
          PutRequest: {
            Item: {
              type: 'AVAIL_ID',
              index: `${id}`,
              name,
              // update expiration date
              ttl: core.genExpirationTTL(new Date()),
            }
          }
        })

      }

    }
  }  return putRequests;
}
```

It simply takes all the grouped items, average the counts, then adds them to the resulting array as put requests. It also adds each unique id to the result.

You're probably wondering why we're constantly putting items in the average table even if the available ids presumably will never change. The reason is to update the item's timestamp. Remember, in deleteOutdated we will be deleting any records older than 5 weeks, including averages and available ids. In case we were to stop tracking a certain id, it would eventually disappear from the table, which is what we intend.

And, finally, the handler:

```javascript
...

exports.handler = async (event, context, callback) => {
  let data = [], _errors = [];

  try {
    let date = new Date();

    let queryParams = {
      TableName: TABLE_MAIN,
      IndexName: 'DayHour',
      KeyConditionExpression: '#dy = :day AND #hr = :hour',
      ExpressionAttributeNames: { '#dy': 'day', '#hr': 'hour' },
      ExpressionAttributeValues: {
        ':day': date.getDay(),
        ':hour': date.getHours(),
      }
    }

    let response = await core.queryTable(queryParams);
    _errors.push(...response.errors);
    data = response.data;
  } catch(e) {
    _errors.push({
      message: `Table ${TABLE_MAIN} unsuccessfully queried`,
      error: e
    });
    data = [];
  }

  if (data.length > 0) {
    let putRequests = this.generateAveragePutRequests(data);

    try {
      let response = await core.processBatchRequests(TABLE_AVERAGED, putRequests);
      _errors.push(...response.errors);
    } catch(e) {
      _errors.push({
        message: 'unable to process batch requests',
        error: e
      });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${TABLE_AVERAGED} updated on ${new Date()}`,
      errors: _errors,
    }),
  };
}
```

This is where the core functions we wrote earlier come in handy. Instead of having to worry about error handling or failures, we can just expect an error object or a data object in the result.

In part 5, we'll start to build the final API endpoint in statusOverview and finally use some GraphQL.

## Part 5

Before we start implementing statusOverview, we need to understand GraphQL and how it'll work in our API endpoint.

GraphQL is essentially a querying language that makes it easier to understand the data you are retrieving from a source. It uses dynamic queries so that you only receive the data you ask for. It's kind of like a shop — you expect to get exactly what you pay for, no more and no less. This kind of data filtering makes understanding the response easy, and increase performance since the API doesn't need to retrieve any unnecessary data. In addition, each piece of data is retrieved in a single request, making GraphQL extremely performance effective.

First, we need to plan how we want our resulting API data to look. We'll need to explicitly tell GraphQL how to do this in a schema. I think the data is best formatted this way:

```graphql
{
  lastUpdated,
  totalNumberOfIntervals,
  availableIds {
    [
      id,
      name
    ]
  },
  statuses(ids) {
    [
      id,
      name,
      current {
        day,
        hour,
        interval,
        percentage
      },
      average {
        [
          day,
          hour,
          interval,
          percentage
        ]
      }
    ]
  }
}
```

So this is how we want our data to be returned to us. I've added a few properties such as lastUpdated, in case we would like to know the time the data was retrieved, and totalNumberOfIntervals, in case we need to know how many hour intervals there are. Then, as expected, we can get availableIds in an array. Since we don't want to get every single status every time we request from the API (there are more than 50,400 statuses, remember?), we can instead choose which ids we would like to retrieve status data from. GraphQL allows us to do this, filtering data and only returning what we need.

Now that we understand the basic principles of GraphQL, we'll begin by writing our GraphQL schema.

First, install graphql and graphql-tag in the root directory from the command line:

```sh
npm i graphql graphql-tag
```

Now, in a new file src/schema.js:

```javascript
const { buildASTSchema } = require('graphql');
const gql = require('graphql-tag');

exports.schema = buildASTSchema(gql`
  schema {
    query: Query
  }

  scalar PositiveInt
  scalar Percentage

  type Query {
    lastUpdated: String!
    totalNumberOfIntervals: Int!
    availableIds: [AvailableId!]!
    statuses(ids: [PositiveInt!]!): [StatusOverview!]
  }

  type AvailableId {
    id: Int!
    name: String
  }

  type StatusOverview {
    id: Int!
    name: String!
    current: Status
    average: [Status!]!
  }

  type Status {
    day: Int!
    hour: Int!
    interval: Int!
    percentage: Percentage!
  }

`);

exports.validatePositiveInt = (target) => {
  let value = target.value ? target.value : target;
  if (value !== null &&
  typeof value !== 'undefined' &&
  !Number.isNaN(value) &&
  value % 1 == 0 &&
  parseInt(value) >= 0) {
    return parseInt(value);
  }

  throw new TypeError(`Value is not an integer greater than or equal to 0: ${value}`);
}

exports.validatePercentage = (target) => {
  let value = target.value ? target.value : target;
  if (value !== null &&
  typeof value !== 'undefined' &&
  !Number.isNaN(value) &&
  parseFloat(value) >= 0 &&
  parseFloat(value) <= 1) {
    return parseFloat(value);
  }

  throw new TypeError(`Value is not a float in range [0, 1]: ${value}`);
}

exports.PositiveIntDef = {
  name: 'PositiveInt',
  description: 'A number type from 0 to positive infinity',
  serialize: (value) => this.validatePositiveInt(value),
  parseValue: (value) => this.validatePositiveInt(value),
  parseLiteral: (ast) => this.validatePositiveInt(ast),
}

exports.PercentageDef = {
  name: 'Percentage',
  description: 'A float type in range [0, 1]',
  serialize: (value) => this.validatePercentage(value),
  parseValue: (value) => this.validatePercentage(value),
  parseLiteral: (ast) => this.validatePercentage(ast),
}

exports.initSchemaTypes = () => {
  Object.assign(this.schema._typeMap.PositiveInt, this.PositiveIntDef);
  Object.assign(this.schema._typeMap.Percentage, this.PercentageDef);
}

this.initSchemaTypes();
```

This may seem very confusing at first, so I'll go through it step by step. The actual schema is exports.schema, and is written in GraphQL's querying language with the help of buildASTSchema. The schema is exactly the same format as the fake schema I created earlier to describe how we wanted our data to look. In this instance I added two new types to GraphQL's built-in types: PositiveInt and Percentage. This is because I'd like to be explicit with types and make sure that the data I'm returning is a valid percentage or a valid natural number. The ! exclamation marks at the end of some of the property definitions mean that the value cannot be null. The rest of the exports simply define how to validate the Percentage and PositiveInt types in the GraphQL AST.

When we query for data in GraphQL, we need three key parts: a schema, a root query, and a query. A schema, like the one we wrote earlier, defines the format of the data and what kinds of queries we can use. A root query translates a query from a GraphQL schema to actual data. This is where we'll be spending a good portion of time. The last part, a query, is what we'll send to the API endpoint in the request body in order to get the information we need.

It'll start to make more sense once we write the root query and handler in the next part.

## Part 6

Now that we have a better understanding of GraphQL, let's start on statusOverview. In src/statusOverview/index.js:

```javascript
const core = require('../core');
exports.schema = require('../schema').schema;
exports.graphql = require('graphql').graphql;

const { TABLE_MAIN, TABLE_AVERAGED } = process.env;

exports.handler = async (event, cxt, cb) => {
  let _data = {}, _errors = [];

  try {
    const { query } = JSON.parse(event.body);
    let response =
      await this.graphql(this.schema, query, this.root(_errors));

    if (response.errors) {
      _errors.push(...response.errors);
    }

    _data = response.data ? JSON.stringify(response.data) : {};

  } catch(e) {
    _errors.push({ 
      message: 'error running GraphQL query', 
      error: e 
    });
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: `last updated ${new Date()}`,
      data: _data,
      errors: _errors,
    }),
  };
}
```

The way we're querying for data from the API endpoint is through the request body. The query will be a string. To query for all the data for id 3005, our body would look like this:

```json
{
  "query": "{lastUpdated,totalNumberOfIntervals,statuses(ids:[3005]) {id,name,current{day,hour,interval,count,percentage},average{day,hour,interval,count,percentage}}}"
}
```

You can look here for better examples of queries.

[examples of queries](https://graphql.org/learn/queries/)

We call the query and then return the data in a response. Notice that we have declared a few response headers. This is because this handler will be the final API Endpoint and needs to be accessible with CORS.

[accessible with CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Ok, we've completed the handler. We now need to construct a root query, or an object that will help translate a GraphQL query into data. We'll do that below the handler:

```javascript
...

exports.root = (_errors) => ({

  lastUpdated: () => ...,

  totalNumberOfIntervals: () => ...,

  availableIds: async () => ...,

  statuses: async (args) => ...,

})
```

What I'm doing is I'm passing an \_errors array to the root query so that any errors that occur within the root can be passed back to the handler and displayed to the end user. The way a root query works is that for each property queried, GraphQL searches for a function with the same name. It then expects the result of the function to look identical to the schema type structure. For example, if I were to query for availableIds, I should expect the root query to be a function that returns an array of objects of { id, name } properties.

Let's start with lastUpdated and totalNumberOfIntervals since they are the easiest to implement. Both of these return single values. I expect a timestamp from lastUpdated for when I retrieved the data, so this one is very easy to implement:

```javascript
lastUpdated: () => new Date().toISOString(),
```

In the same way, totalNumberOfIntervals only needs to return a single numerical value:

```javascript
totalNumberOfIntervals: () => core.NUM_HOUR_INTERVALS,
```

Simple enough, right? In availableIds we need to actually query data, so we'll use an asynchronous function.

```javascript
availableIds: async () => {
  let result = [];  try {
    let queryParams = {
      TableName: TABLE_AVERAGED,
      KeyConditionExpression: '#tp = :type',
      ExpressionAttributeNames: { '#tp': 'type'},
      ExpressionAttributeValues: { ':type': 'AVAIL_ID' },
    }

    let response = await core.queryTable(queryParams) ||
      { data: [], errors: [] };

    _errors.push(...response.errors);

    result = response.data
      .map((item) => ({
        id: item.index,
        name: item.name,
      }));
  } catch(e) {
    _errors.push({
      message: 'unable to get available ids.',
      error: e
    });
  }

  return result;
},
```

We're using the type primary key to filter the average table by available ids, then retrieving all of them. Notice that the result I'm returning is an array of objects in the format { id, name }. In the actual result, since GraphQL only returns exactly the data request, it will delete any unnecessary property from the data.

Now, the hardest part — the statuses root query. I'll go through this in parts.

```javascript
statuses: async (args) => {
  let ids = args ? args.ids : null;
  let result = [];

  if (!ids || ids.length === 0) {
    return result;
  }

  ...

},
```

I'll go through this slowly. First, the way the query accepts ids is through an args object. Since we're expecting an array of ids, I immediately retrieve the ids. If there are no ids or the ids parameter is invalid, I simply return an empty array.

Then we get the current data using formatCurrentData. Since this just retrieves the current data for all ids, we don't need to worry about getting data for a specific id.

```javascript
  ...

  // current data
  let current = [];
  try {
    let response = await core.formatCurrentData();

    _errors.push(...response.errors);
    current.push(...response.data);
  } catch(e) {
    _errors.push({
      messages: 'unable to fetch current data',
      error: e
    });
  }

  ...
```

Now we'll start getting the average data. We also would like to retrieve the max counts of the statuses so we can calculate percentages later. Since we need to loop through each id and loop through each max count, it would be very inefficient to asynchronously wait for each query. Instead, we can group these queries into arrays and await all of them using Promise.all():

```javascript
  ...

  let statusPromises = [], maxCountPromises = [];

  for (let id of ids) {

    // average data

    let queryParams = {
      TableName : TABLE_AVERAGED,
      KeyConditionExpression:
        '#tp = :type AND begins_with(#idx, :index)',
      ExpressionAttributeNames: { '#tp': 'type', '#idx': 'index'},
      ExpressionAttributeValues: 
        { ':type': 'AVG', ':index': `${id}_` },
    }

    let statusArr = core.queryTable(queryParams);
    statusPromises.push(statusArr);

    // get max counts

    queryParams = {
      TableName : TABLE_MAIN,
      IndexName: 'IdCount',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id },
      Limit: 1,
      ScanIndexForward: false,
    }

    let maxCount = core.queryTable(queryParams, false);
    maxCountPromises.push(maxCount);
  }
```

Then, to await promises:

```javascript
  ...

  let maxCounts = [];

  try {
    let responses = await Promise.all(maxCountPromises);

    for (let response of responses) {
      _errors.push(...response.errors);

      if (response.data.length > 0) {
        let max = response.data[0].count || 1;
        maxCounts.push(max);
      }
    }

  } catch(e) {
    _errors.push({ 
      messages: 'unable to await max count promises', 
      error: e 
    });
  }

  let averages = [];

  try {
    let responses = await Promise.all(statusPromises);

    for (let response of responses) {
      _errors.push(...response.errors);
      averages.push(response.data);
    }

  } catch(e) {
    _errors.push({ message: 'unable to await promises', error: e });
  }
```

Here's where the trick comes in. All of our averages and all of our max counts are stored in arrays. But how are we supposed to know which ones go with which? There's no way to know which averages go with which ids without parsing through each average and matching it with each id. Luckily, since we queried in a loop, the queries are stored in an array in the same order as the ids. Promise.all() also ensures that the order of the resulting array will be the same as the order of the asynchronous task array. With this in mind, we can loop through all of the arrays using the same index for each array.

[promise order of resolved values](https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values)

```javascript
  ...

  // based around the simple fact that the order of promises in
  // Promise.all() is preserved

  for (let i in averages) {
    let status = { id: ids[i], name: null, current: {}, average: [] };

    status.name = averages[i][0] ? averages[i][0].name : '';

    status.current =
      current.filter((status) => status.id == ids[i])[0] || {};

    status.current.percentage =
      this.createPercentage(status.current.count, maxCounts[i]);

    status.average = averages[i]
      .map((item) => {

        let percentage =
          this.createPercentage(item.count, maxCounts[i]);

        return { ...item, percentage };
      });

    result.push(status);
  }

  return result;
```

For each id, we construct a { id, name, current, average } object identical to the format we defined earlier in the schema. We then go through each of the properties and fill in each accordingly.

Since we have to calculate percentages for both the current and average statuses, I made a separate function to do this after the root query in src/statusOverview/index.js:

```javascript
...

exports.createPercentage = (count, total) => {
  let percentage = 0;

  if (count && total && total > 0) {

    percentage = Math.floor(count / total * 100) / 100;

    // clamp percentage
    percentage = Math.max(Math.min(percentage, 1), 0);
  }

  return percentage;
}
```

This is because there are edge cases where the percentage may return a number not within the [0, 1] range or return NaN if the total is 0. By default, the percentage is 0, and the result percentage is clamped using a clever javascript Math trick.

[how to clamp a number in javascript](https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment/11409978)

That completes the statusOverview API endpoint.

And that's it! We're done with the entire project! At this point, your root directory should look something like this:

```
ROOT /
  src /
    statusOverview/
      index.js
    updateStatus/
      index.js
    updateStatusAveraged/
      index.js
    core.js
    schema.js
  package-lock.json
  package.json
  template.yaml
```

Now you can upload the code to AWS and call it a day. At this point you can start implement a frontend to show your data off to your friends.

I hope you've learned something throughout this whole process like I have — some projects may seem daunting and impossible at first, but time and thought will help you realize that no project is impossible.
