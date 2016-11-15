# Counts the tags in a Stack Overflow job search

    git clone https://github.com/pubudug/stack-job-tag-count
    npm install
    ./index -h
    ./index.js -u "http://stackoverflow.com/jobs?tl=java&v=true&sort=p"

The -u parameter must be a Stack Overflow job search URL.

## Example output
  java:58
  python:12
  scala:11
  spring:8
  android:8
  c++:7
  javascript:7
  amazon-web-services:6


You can use this to find out what technology is asked alongside a technology you already know. For example, from above result, if you already know java, knowing scala or python will be useful.
