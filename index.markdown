---
layout: default
title: Home
---

# Welcome

Welcome to my personal site. Here you'll find articles about astrophotography, image processing, and other topics I'm passionate about.

## Recent Articles

{% assign published_articles = site.articles | where: "published", true %}
{% assign sorted_articles = published_articles | sort: 'series_order' %}
{% if sorted_articles.size > 0 %}
  <ul>
  {% for article in sorted_articles %}
    <li>
      {% if article.series %}
        <a href="{{ article.url }}">{{ article.title }}</a> - <em>Part {{ article.series_order }} of {{ article.series }}</em>
      {% else %}
        <a href="{{ article.url }}">{{ article.title }}</a>
      {% endif %}
    </li>
  {% endfor %}
  </ul>
{% else %}
  <p>No articles yet. Check back soon!</p>
{% endif %}

---

<div style="text-align: center; margin-top: 3em;">
  <a href="https://cloudappreciationsociety.org" target="_blank" rel="noopener noreferrer">
    <img src="/assets/images/cas-supporter.png" alt="Cloud Appreciation Society Supporter" style="max-width: 60px; height: auto;">
  </a>
</div>

