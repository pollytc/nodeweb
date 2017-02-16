#!/usr/bin/env python
# coding:utf-8

from pymongo import MongoClient
conn = MongoClient('127.0.0.1', 27017)
clafy = conn.blog.classfytable
filen = conn.blog.fileinfotable
# obj = clafy.find().skip(1).limit(10)
cla = '1486614872.5'
pol = filen.find({'classfy': {'$all':[cla]}})

for p in pol:
    print p['_id']
