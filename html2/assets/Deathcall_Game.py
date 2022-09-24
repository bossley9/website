#!/usr/bin/python

import time, random

x=1
if x == 1:
    time.sleep(random.randint(0,5))
    print("loading images...")
    time.sleep(random.randint(0,10))
    print("starting setup...")
    time.sleep(random.randint(0,10))
    print("configuring settings...")
    time.sleep(random.randint(0,10))
    print("visualizing graphics...")
    time.sleep(random.randint(0,10))
    print("opening game..........")
    time.sleep(random.randint(0,10))
for x in range(0, 25):
    print("your mother!")
    time.sleep(0.15)
    print("hahahaha!")
    time.sleep(0.15)
y=1
print("hahahaha......ooh, that was too funny....")
while y == 1:
    Question = raw_input("now...do you want to play the actual game?(y/n):") 
    if Question.lower() == 'n':
        print("aww...you don't appreciate my work....well......sorry...have fun watching more of YOUR MOTHER!!!")
        time.sleep(5)
        y=2
        x=2
    elif Question.lower() == 'y':
        print("alright, alright, fine.......but....the thing is.....that WAS the game!!! Ok, let's play it then!!!")
        time.sleep(2)
        y=2
        x=2
    else:
        print("what? What kind of answer is THAT?")
while x == 2:
    print("your mother!")
