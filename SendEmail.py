#!/usr/bin/env python

import subprocess
import os
import pexpect
import time
from subprocess import call
from collections import namedtuple
import urllib2
import urllib, sys
import smtplib
from email.mime.text import MIMEText

SMTP_SERVER = "atom.corp.ebay.com"
EMAIL_TEMPLATE = 'AlertBudgetTemplate.html'
EMAIL_SEND = 'AlertBudgetSend.html'
FROM = 'DL-PayPal-YourMoneyBestFriend@paypal.com'

NAME1 = 'Monthly Budget Expense Alert'
NAME2 = 'Your spending on PayPal Account has reach'
SUBJECT = 'Alert: Overspending on your PayPal account'

class SendEmail:
	def __init__(self, toE, name, amount, budget):
		self.toE = toE
		self.name = name
		self.amount = amount
		self.budget = budget
	
	def sendemail(self):
		self.constructEmail()
		fp = open(EMAIL_SEND, 'rb')
		msg = MIMEText(fp.read(), 'html')
		fp.close()
		msg['Subject'] = SUBJECT 
		msg['From'] = FROM
		msg['To'] = self.toE
		s = smtplib.SMTP(SMTP_SERVER)
		s.sendmail(FROM, ['livu@paypal.com', self.toE], msg.as_string())

	def constructEmail(self):
		file_r = open(EMAIL_TEMPLATE)
		file_w = open (EMAIL_SEND, 'w')
		lines = file_r.readlines()
		line1 = self.name + '</span></strong><span style=\'font-size:9.0pt;font-family:"Helvetica","sans-serif"; color:#1F497D\'> .</span><span style=\'font-size:9.0pt;font-family:"Helvetica","sans-serif"; color:#666666\'> </span><span style=\'font-size:9.0pt;font-family:"Helvetica","sans-serif"; color:#1F497D\'>Monthly Budget Expense Alert</span>'
		line2 = self.name + ',</span><span style=\'font-size:10.0pt; font-family:"Helvetica","sans-serif";color:#666666\'><br> <br> </span><span style=\'font-size:10.0pt;font-family:"Helvetica","sans-serif"; color:#1F497D\'>Your spending on PayPal Account has reach' + str(self.amount) + ' USD. This is almost reach the budget ' + str(self.budget) + ' $ for this month!</span><span'
		for line in lines:
			if NAME1 in line:
				file_w.write(line1)
			elif NAME2 in line:
				file_w.write(line2)
			else:
				file_w.write(line)
		file_w.close()
		file_r.close()

if 1:
	receiver = sys.argv[1]
	name = sys.argv[2]
	amount = sys.argv[3]
	budget = sys.argv[4]
	sendE = SendEmail(receiver, name, amount, budget)
	sendE.sendemail()


if 0:
	sender = 'thanhtnguyen@paypal.com'
	receiver = 'livu@paypal.com'
	name  = 'Vu Linh'
	amount = 12
	budget = 20
	subject = 'Alert: Overspending on your PayPal account'
	emailSend = EMAIL_SEND
	sendE = SendEmail(receiver, name, amount, budget)
	sendE.sendemail()


#sender = 'livu@corp.ebay.com'
#receiver = 'livu@paypal.com, livu@paypal.com'
#sendE = SendEmail(sender, receiver, 'Testing', EMAIL_TEMPLATE)
#sendE.sendemail()

#sender ='livu@corp.ebay.com'
#receiver = 'livu@corp.ebay.com'
#msg = MIMEText("Since I grew 1 year old today, lets celebrate tonite at Raffles spcae")

#textfile = 'testemail.txt'
#fp = open(textfile, 'rb')
#msg = MIMEText(fp.read())
#fp.close()

#msg['Subject'] = 'Birthday treat'
#msg['From'] = sender
#msg['To'] = receiver
#SMTP_SERVER = "atom.corp.ebay.com"
#s = smtplib.SMTP(SMTP_SERVER)
#s.sendmail(sender, [receiver, 'livu@paypal.com'], msg.as_string())
#s.quit()


