# Introduction

This document contains a description of the various data structures
used in this library. 

The document is intended for internal use, but is a part of the add-on
for others to peruse, should they wish to dig into the inner workings
of the library. 


## Notebooks
The individual notebooks are stores as a json array in a library property 
called `notebooks`. The structure of each record in this array is:
```json
{
        "title": "Title of the notebook",
        "summary": "A short summary of the notebook. Optional.",
        "owner": "Name of the owner, i.e. a player.",
        "private": false, // Whether the notebook is private.
        "accent": "#61003E", // The accent (or distinctive) color for the notebook,
        "readonly": true, // Whether the notebook is read-only for all, but the owner.
        "pages": [
            {
                "name": "Name of the page",
                "content":"Content of the page",
                "uri": "Only used for the built-in user guide"
            }
        ]
    }

```