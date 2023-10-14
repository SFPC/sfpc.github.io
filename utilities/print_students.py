# this script loops through all the files in the _people directory and outputs
# a csv list of students, which can then be imported into excel/google sheets.
#
# in order to run this file, you must install frontmatter
#
#   pip install python-frontmatter
#

import frontmatter
import os


print('name,class,website')

for filename in os.listdir('_people'):
  person = frontmatter.load('_people/' + filename)
  name = person['title']
  website =  person['website'] if 'website' in person else ''
  website = '' if website == None else website
  student_class = None

  for affiliation in person['affiliation']:
    if affiliation['role'] == 'Student':
      student_class = affiliation['class']

  if student_class != None:

    print(name + ',' + student_class + ',' + website)
