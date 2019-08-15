# Repository Library

## Summary
This sample shows how you can use repository pattern to separate the logic that retrieves the data from SharePoint and maps it to the entity model from the business logic that acts on the model. This library then can be shared across all of your web parts and extensions.

The separation between the data and business tiers has three benefits:

* It centralizes the data logic or Web service access logic.
* It provides a substitution point for the unit tests.
* It provides a flexible architecture that can be adapted as the overall design of - the application evolves.

It's just a basic implementation to show you how to centralize your data access needs, you can do more with this library like including search api to have advanced queries, caching etc.

## Used SharePoint Framework Version 

![drop](https://img.shields.io/badge/version-1.9-green.svg)

## Applies to

* [SharePoint Framework](https://dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
ts-repository-library | Ramin Ahmadi

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 16, 2019|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `npm link`
  - `gulp serve`

Web part or extension solution:
- `npm link ts-repository-library`
- import the repositories:
```
import * as Repository from "ts-repository-library";
```
- SharePoint repository usage:
```
interface MySampleList{
    Id:number;
    Title:string;
    Active:boolean;
}

// get all items
const items = await segmentList.getAll();

// add new item
await segmentList.add({
    Title:"My New Segment",
    Active: true
});
// update an existing item
await segmentList.update({
  Id:1,
  Title:"Item has been updated",
  Active: false
});
// remove item
await segmentList.delete(2);

```