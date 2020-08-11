---
title: Writing Guidelines 
layout: participate2
location:
contact: sfpc
---

## Website Updates and Markdown Editing

*A style guide for keeping  [sfpc.io](https://sfpc.io/) accessible*

The web as we know it is built and standardized to be accessible for a wide variety of people. Browsers and phones have a variety of tools which assist experiencing the web however it's accessed across a gradient of assistance. As an organization which publishes text and images frequently online, we owe it to people reading and interacting with SFPC to fully enable these browser accessibility tools. Activists, policy makers, and developers have paved the way so that we can make an experience for everyone. In that vein, here are a few tips to use when writing content for SFPC. At the bottom of this document, there is also a checklist to compare against when making your own content.

### Image tagging

Wherever a image provides editorial information or context for a post or article, it should get tagged with an "alt-tag." These are used when someone is using a slower internet connection, and, first and foremost, when a screen reader is active.

Perkins School for the Blind is a forefront resource on improving access and education for people who are blind. It's a great institution, and they have some advice for tagging:
[https://www.perkinselearning.org/technology/blog/how-write-alt-text-and-image-descriptions-instagram](https://www.perkinselearning.org/technology/blog/how-write-alt-text-and-image-descriptions-instagram)
 Some simple guidelines for writing useful alt-tags:

1. **Do**: provide information about the literal content of the image
2. **Don't**: Say that it is a "Photo of ___", screen readers and browsers already know and indicate that it is an image, and people using readers are extremely efficient with them.
3. **Decide**: whether to provide implied context of the image. It isn't always helpful, but if it is a complex art piece which is very challenging to describe in one or two sentences, it may be a good idea to add abstract meaning.

For someone who has the ability, writing image tags is usually as simple as if you looked at a picture and tried to describe it to someone next to you in one or two sentences. Think back to when you've done that during a phone call, for instance. Perkins doesn't recommend making the description hard to understand for the sake of accurately describing colors (e.g. [https://colors.lol/](https://colors.lol/).) Instead, it's usually best to focus on the subject matter.

In the sfpc website when editing a page, the markdown for alternative text looks like this (where the highlighted region is the alt-text.

```markdown
![Zine creation in progress](/static/img/nytechzinefair2.jpg)
```

In some SFPC website pages, we use a carousel image "slide" system. In order to set up some slides, we might use markdown text at the top of a file like:

```markdown
---
title: SFPC Creative Coding Bootcamp (online)
layout: participate
location:
contact: sfpc
slides:

  - "/static/img/bootcamp/bootcamp1.jpg"
  - "/static/img/bootcamp/bootcamp2.jpg"
  - "/static/img/bootcamp/bootcamp5.jpg"
  - "/static/img/bootcamp/bootcamp6.jpg"  
---
```

Setting up slides as shown above doesn't make that content accessible for people who use screen readers. Let's add alternative text to the slides:

```markdown
---
title: SFPC Creative Coding Bootcamp (online)
layout: participate
location:
contact: sfpc
slides:

- image: "/static/img/bootcamp/bootcamp1.jpg"
  alt: "people studying at laptops in SFPC space"
- image: "/static/img/bootcamp/bootcamp5.jpg"
  alt: "people comparing notes on paper and in code on a laptop"
- image: "/static/img/bootcamp/bootcamp6.jpg"
  alt: "a group sfpc creative coding bootcamp photo, with projected stars on top"
---
```

Now, when people look at your page, they'll be able to access the content of the image whether they're looking at an image or using a screen reader to describe it.

### Logotype images versus textuals

Whenever possible, format titles, text, etc as actual text rather than logo type or poster images. Posters which have information such as dates, times, and locations should have the text repeated in the article.

### Contrast in graphics

For photography this isn't such a concern, but for graphics and especially important ones, keeping the contrast high (avoiding hard to see colors) is a good idea.

It's possible to check and quantify contrast, and many websites exist to help confirm. For instance these ones work well:

[https://contrastchecker.com/](https://contrastchecker.com/)

[https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

## General Examples

![Blue hydrangea flowers soon after rain](/static/img/guidelines/flower.png)

😊a-ok! →  "Blue hydrangea flowers soon after rain"

😤functional, but too simple to be pleasant→ "Flowers"

😬 too long → "photo of light lavender hydrangea flowers after a recent rain set against a mottled concrete background, with 25 leaves present, and a small bite out of one leaf which could have been from a dog, but alternatively could have been a cute bug"

## Social Media

*Communicating with the outside net*

### Blogging and Medium Posts

*Adding care to editorial systems*

Largely, the Medium design team has this covered. Just make sure to add alternative text.

![medium blog photo add view](/static/img/guidelines/medium1.png)

In the Medium editor, hovering over an image presents this view. Make sure to add a caption AND some alternative text. These serve different purposes.

![medium blog alt text view](/static/img/guidelines/medium2.png)

Clicking on the alt text button presents this view

### Instagram

- Guide for adding alt text
[https://help.instagram.com/503708446705527](https://help.instagram.com/503708446705527)

When posting, an example situation might look like this. Although Instagram uses machine learning to infer the contents of images and provide automatic alternative text, doing it manually will be much more usable and far more accurate.

<div style="display: flex; flex-direction: row;">
<div>
<img style="padding: 10px;" src="/static/img/guidelines/instagram1.png" alt="instagram photo add view">
</div>
<div>
<img style="padding: 10px;" src="/static/img/guidelines/instagram2.png" alt="instagram photo detail view">
</div>
<div>
<img style="padding: 10px;" src="/static/img/guidelines/instagram3.png" alt="instagram alt text view">
</div>
</div>

### Twitter

- Guide for adding alt text
[https://help.twitter.com/en/using-twitter/picture-descriptions](https://help.twitter.com/en/using-twitter/picture-descriptions)

### MailChimp

- Guide for adding alt text
[https://mailchimp.com/help/add-alt-text-to-images/](https://mailchimp.com/help/add-alt-text-to-images/)
