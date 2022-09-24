---
title: Government Websites Suck
desc: 'I think the government websites of the United States need to be redesigned by the younger generation. Poorly-design government websites only make taxes, government services, and understanding government workings more complicated.'
date: 02/22/21 11:01
lastUpdated: 02/22/21 11:01
tags:
  - commentary
  - tech
---

Government websites suck.

When I lightly use the term "suck", I don't necessarily mean that government websites "don't look nice". What I mean is that government websites are _poorly designed_, both aesthetically and functionally.

So what's the significance? There's a lot of other websites that are objectively worse than official government sites, and a lot more problems to worry about than bad government websites... Right?

Instead of trying to explain from the start why well-designed government websites are so important to me, let me first provide two real examples of using government websites from my personal experiences.

### Exhibit A: Molina Medicaid Benefits

I currently reside in the state of Ohio. As a legally single independent with no dependents, I must provide my own health insurance in order to attend a higher educational institution - in other words, I need health insurance. Unfortunately, my occupational status is too elementary to have an insurance benefits plan provided to me, and health insurance is very expensive for a student. What do I do?

The United States offers a nationwide program called Medicaid: government-funded health insurance plan provided for people whose household income falls below a certain threshold. All a resident of Ohio would need to do to have "free" health insurance would be to submit an application stating legal information and their annual household income and Medicaid will provide benefits based on your eligibility.

How do you apply, you ask? Let's walk through their online application.

I first navigated to the [Molina Medicaid Benefits portal](https://ssp.benefits.ohio.gov) to find this page greeting me.

![The Molina Medicaid Benefits homepage with old graphics and small links](gov-web-ssp.png)

Ok, not the prettiest site, but it could be worse, right?

Well, since I'm new, I'm going to click on "How To Use This Site" in the side menu since the site is not intuitive enough and I need to be told how to use the internet. I guess websites are not supposed to be made to be intuitive nowadays.

![Molina Medicaid Benefits how to use page, containing a link to yet another page](gov-web-ssp-how-to-use.png)

Fortunately, that link takes me to another page that tells me to click another link. Oh, okay, you have to click two links to figure out how to use this website. Could be worse.

![Molina Medicaid Benefits learn how to use page, containing a link to a different external page](gov-web-ssp-learn-how-to-use.png)

Now that I've already clicked two links to figure out how to use this site, I have to click another link to view a tutorial? How many links do I have to click, exactly? And it doesn't even say what the tutorial is about. "In this tutorial, citizens will learn how to" what? Get frustrated with the process?

I could go on and on down a rabbit hole about this website and its many flaws, but I think I've made my point. Here are a few other laughable characteristics of the Medicaid site:

- The "What's New?" link redirects to a blank page that only says there are no new updates. A well-designed website should not even display an option to see "what's new" unless something was new.

  ![What's New? link stating that no updates are available](gov-web-whats-new.png)

- The site restricts context menus and page navigation. A context menu is a menu that appears on an application when right-clicked (for example, most browsers have a context menu with options such as _Inspect Element_, _Copy Link Address_, and _Open Link in New Tab_). This is poor web design practice because it reduces accessibility - keyboard navigation is not possible and it is not possible to open links in other tabs.

- The site falsifies language accessibility. Near the bottom of every page it contains a list of commonly spoken languages in the world; however, clicking on one of these language links redirects to a page that only states a phone number to call to receive language assistance.

  ![Various language translations telling people to call a phone number](gov-web-ssp-lang.png)

  What's the purpose of including an enticing list of languages if no direct translation or assistance is provided? This just costs the user more time and effort to click the language button, then return to the main page. An alternate solution would be to include at the bottom of every page a language icon next to the phone number because it provides the same amount of semantic reasoning and reduces the amount of redundancy.

  [React JS](https://reactjs.org/) does a wonderful job handling language barriers. It provides a single button for all languages. In this solution, the symbol is intuitive and the english word "language" or "languages" is nearly universal.

  ![A symbol of a mandarin and english character next to the word "language"](gov-web-react-lang.png)

- The site does a poor job of capitalizing on screen space. Take for example the _forms_ subpage of the benefits site.

  ![The Molina Medicaid Forms page with the content taking up the center of the page](gov-web-ssp-forms.png)

  Why is there so much extra whitespace on the sides? The bottom? Seems like a waste of space to me. Wouldn't it be better to at least make the font size or content larger?

  This is poor design because most of the pages on the site only detail a small section of content of the benefits (in this case, various forms) and waste space. If a website does not capitalize on the domain of a screen space, what's the purpose of having that large of an area?

  One potential purpose for horizontal whitespace is for emphasis on content. A good example of strategically using horizontal whitespace to capitalize on content emphasis is Twitter. In this example, our eyes are naturally drawn to the center of the content. Twitter's goal is to have people consume as much content as possible, and what better what to do that than to condense content? By maintaining content in the center, it becomes much easier to read content than having to move your eyes from left to right constantly. It's also the reason why mobile phone are vertically-shaped and not usually held in a landscape orientation (not including the convenience of holding a vertically-shaped device in your hand).

  ![The Twitter main page layout on a desktop site, using horizontal space on either side of the page to emphasize the center of the page](gov-web-twitter.png)

  However, the Molina Medicaid site is not attempting to capitalize on horizontal whitespace. The content does not need emphasis since each page has a short amount of content, and nothing on this site should be emphasized over other pieces of content - in fact, the _only_ content on this website should be important informtion pertaining to healthcare benefits.

- Most links on the page are external links, meaning that clicking on a link will redirect the user to another webpage domain. For example, clicking on _Cash Assistance_ redirects to a [departmental job and service site](https://jfs.ohio.gov/ocomm_root/ourservices/1000OurServices.stm). This is problematic for two reasons:

  - The site cannot manage the informational content it provides. That means that in the case that the department site changes its layout or urls, or even goes down, the medicaid site now maintains a dead link. An informational administrative website should be in full control over the content it serves. The only cases in which a website should link to external sites is when it intentionally does so through a _resources_ page, or explicitly states that it will redirect to an external site.
  - External links are generally a security hazard. Similar to the previous idea, if you link to an external site, you have no control over the content it provides. With that in mind, if the departmental site was hacked and replaced, everyone who clicks the link could have their secure information stolen. Since this is a government website, if an external link was hack and the login session was maintained across redirects, the hacked site could potentially have access to your name, date of birth, tax information, social security number, and worse. This is called phishing, and it's the very reason why people are told to never click on links in emails.

- The site has discontinuity in content to user experience. For example, looking at the main page, how would I apply for benefits? Do I click on the serif capitalized text "APPLY" above the picture in the center? Do I click on the picture? Do I just click on the box?

  ![The Molina Medicaid Benefits homepage with old graphics and small links](gov-web-ssp.png)

  The answer is none of the above. You need to click on the small print below the image.

  ![The apply button is highlighted as arbitrary text below the bold text and image](gov-web-ssp-apply.png)

  This is discontinuity of user experience at its finest. What is the purpose, then, of capitalizing the "APPLY" text? Emphasis? What purpose does the visual aid serve? Why are the different options boxed with borders? Why is the word "Apply" bolded in the bottom text if the entire phrase is the link?

  One of the biggest lessons I've learned from personal web development is that _just because something looks nice does not mean that it's "good"_. It doesn't matter if the prettiest interface known to man was created if it doesn't function properly. I would wager to say that these design decisions were made by someone not to add semantic meaning to the content, but rather, to make the website look "nice" or "modern" - neither of which this site accomplishes.

- Forms are disconnected. Most websites will have forms that have connected fields - when the user presses `TAB`, the focus will shift from one input blank to the next, and when the user presses `ENTER`, the form will be submitted. However, the Medicaid benefits page does not follow this standard. When logging in, pressing `ENTER` does not submit the form; likewise, pressing `TAB` does not focus the next blank. This is directly against the standard put in place by [W3C](TODO), the official standards of the internet.

- The content server is unreliable. Last year, when I reapplied for medicaid through their site, I was required to upload legal documentation for them to verify my financial status and identity. While uploading files, I noticed that it wouldn't allow me to upload photos of my drivers license due to file size. At first I thought it was due to my phone camera being too high in resolution, so I scaled down the image and resubmitted it. It was still too big. After reading more carefully, I realized that the maximum upload size was 100K bytes. To put this in perspective, this is approximately the size of an image with dimensions 250x100 pixels.

  To make matter worse, the average upload speed for each document was about 300 Kb/s. This is 5x worse than the average DSL internet upload speed. I had to wait more than ten minutes for my documents to upload.

  > When I first opened the Molbna Medicaid benefits portal to take the above screenshots and mention the different features, it returned a 404 error page. I had to reload the page a few times for the actual content to display properly. Talk about ironic (and embarrassing)!

### Exhibit B: BMV

When I applied to take my license permit and driver test, I went through the [Indiana official BMV website](https://www.in.gov/bmv/). Let's take a look and see how easy it is to navigate the website.

![The main landing page of the Indiana bmv site, with a top bar, COVID-19 banner, portal area, and link anchor](gov-web-bmv.png)

As soon as I open the site, I'm immediately overwhelmed by the sheer amount of content links clouding the page. I counted 29 different links to different pages. To make matters worse, each link is vague in what page content it will return. This is a classic example of _jaded routing_ - overwhelming the user with an overly complicated website navigation system. This is worse than having no navigation at all because the sheer amount of choice overwhelms the user to the point of navigating away from the site. For example, if I wanted to schedule a permit test, my thought process might follow something like this:

> I probably need to click on "Branch Appointment Info" in the top center to schedule an appointment.

> Wait, there's a bright orange button slightly off-center reading "Schedule Your Test" in all capitals. But is that for permit tests or for driving tests?

> Maybe I should click on "Do You Have Your Real ID Yet?" in the bottom right corner because I don't have my ID yet.

> There's another link to the left of that one that says "Get Info on Licenses, Permits, and IDs" and I am definitely looking for information on permits...

> But at the very bottom left there's a link called "Find a Branch or BMV Connect Kiosk"... should I be looking for a branch first before I try to create an appointment?

> The center of the page emphasizes "Register for an Account" so do I need to have an account before I try scheduling an appointment?

> Or maybe I should click on the menu in the top left corner? It should have all relevant links, right?

> Screw this. I have no idea what to click. I'll just search in the top right search bar to find the permit test information.

This brings me to something I learned at my internship this past summer while discussing how to improve user retention in web applications and make information and content easier for users to find quickly:

> If a user has to resort to using a search bar to search for information, it means that **the application has already failed its primary objective to deliver the right content to the user**. It means that the user did not find what they were looking for and were forced to go out of their way to search for it.

The same principle applies for backwards navigation in a page. If you have to go back in your page history, it means that you didn't find what you were looking for and _the page failed you_. Likewise, the principle applies to opening links in new tabs. How many times have you spam-opened a bunch of links adjacent to each other in their own new tab? This behaviour indicates that you know the links you click on may not give you the information you need. If you already know the page may not have the information you need without even looking at the page, _the page has already failed you_. This is one of the most important factors in creating any front-facing application - ease of access to information. The information users want should be easy and quick to find. However, the Indiana BMV landing page is the antithesis of "ease of access".

### Exhibit C: IRS

I have one arguably major grievance with the [IRS website](http://irs.gov/) I experienced two years ago that actually was one of the main reasons I felt compelled to write about this. I think it's especially relevant now since it is tax season.

Two years ago, when filling out my tax returns for 2018, I made a minor mistake when reporting my scholarships and grants. I didn't notice my error at the time and probably would have never realized it existed had I not received a letter directly from the IRS stating that if I did not resubmit my 1040 and various schedules before the specified date, the IRS has the legally obligation to cancel my housing contract and withdraw funds from my bank account as compensation. Talk about scary.

Physical mail always takes ages to arrive places, and by the time I had received the notice, I had already lost precious time to resubmit my tax returns. In fact, I only had four or five days left. I knew that my tax return might not make it to the IRS in time to meet the deadline, so I had to submit it online. After filling out the various forms, I attempted to log into the IRS website to submit the forms. I pressed "log in" and waited for the page to load... except the page never loaded.

I waited 20 minutes before using browser debugging tools to notice that the IRS website had an internal [Ajax](<https://en.wikipedia.org/wiki/Ajax_(programming)>) request error. I don't think I even need to explain in detail the fact that Ajax was a good web development technology in, I don't know, 2009? This goes beyond poor web design - this is simply _broken web design_. The website did not function as intended. I waited two entire days before it worked and I was able to submit my tax return revisions properly.

### So What?

What's the point? Who cares if a government website is broken? Why does it even matter?

It matters because these sites are _important_. These aren't social media sites where people talk about the latest TikTok challenge or post pictures of puppies. These are sites people rely on to pay taxes, get healthcare, and manage legal contracts. These sites pertain to the inner workings of our country. How are citizens of the United States supposed to pay taxes if the IRS servers are down for days at a time? How are low income individuals like me supposed to apply for Medicaid if the site is impossible to navigate? The government claims to make all sorts of services available to its citizens, but what's the point of saying they're available if they barely work?

Furthermore, these sites are the front-facing platforms on the internet that represent the United States. How can we claim to be a technologically-advanced country if we don't even use technology from this decade alone? It's frankly embarrassing as a software developer to live in a country that exhibits this sort of website content.

So why haven't we tried to solve these problems?

The answer is the _massive generational gap between officials of the US government and its citizens_. Most of the elected officials in government don't even use these internet platforms, so why would they devote resources and energy into the maintenance of these sites?

How could this problem be solved?

1. Hire a United States web/native development team and UX team specifically for government-affiliated websites. A single unified team could clean up each individual site and connect all of the various sites together under a single theme. Who knows, they might even be able to make apps that make navigating these apps even easier!
2. Run for office! Each of us has the power to change our country for the better. This is a sentiment most people are already behind - so why isn't it already happening?

I think the most important idea to take away from these poorly-designed websites is that you have the power to make change. One of my favorite quotes by Mahatma Gandhi is this:

> Be the change you wish to see in the world.
