# Taskline

Taskline is a hobby project with the aim to practice fullstack development and web-environment but is still based on real world needs. Quite simply it is a management 
tool designed for businesses. It's supposed to be quite simple in regards to scope and usability with low-threshold to use it.


## Table of content

[Scope](##scope)
[Users](##users)
[User stories](###user-stories)
[Technologies](##Technologies)
[UML](##UML)

## Scope

### Journal

A entry is added on a specific date, where it is possible to enter text, the person who made the entry, and the person 
responsible for completing the task. Entries are organized from newest to oldest. Entries from the previous month expire
at the turn of the month (though it might be good to keep the previous week visible), at which point they are moved
to an archive. It could also make sense to delete diary entries from the archive that are older than n-2 years, as records
from two years ago are probably no longer relevant. However, it might be worth considering functionality for downloading the
archive in some file format before deletion, so that diary entries can be stored for a longer period if desired by the owner(by downloading
them locally).

### Announcements

It should be possible to add information that is only relevant for a specific (defined) period. However, some information may 
need to be stored indefinitely (Responsibility of deleting this information when it's irrelevant lies on the client). In this 
section, it would make sense to display mainly active information, meaning that once the time limit expires, the entry is deleted.
Upcoming events could appear in a separate field about a week before the event starts, allowing time to react to them. Permanent
entries and expiring ones could be rendered in different sections.

### Photos

A section where relevant images for the location/teams (going forward only referred as locations) can be added, along with explanations 
for the images (i.e., why they are relevant). Generally speaking, these are permanent features, but there should still be an option for manual deletion.


## Users

The application is designed to effectively have two different roles for users: admin and user. The admin-role is used for controlling the business, that is 
locations/teams (going  and workers. 

### User stories

#### Business owner

The business owner runs one or more teams and needs a way for workers to share information. The owner should be able to manage the teams, including knowing 
who is working and where. When a new worker joins, the owner can assign them to a team. Owners can also create and manage multiple teams. In the designed use 
cases, the owner does not need to modify team information directly, meaning the position is read-only and managerial. If the owner wants to make changes, they’ll 
need to create a separate account for working with the teams. The key aspect of the application for owners/managers is team management, so UX is the main focus for admin users.

#### User case 1

The user is presented with problem X and starts to solve it. The user either completes the task or completes it partially, but decides it’s best to 
inform co-workers of the changes this process has brought. For future reference the user needs to provide the date of the change and their identity. 
It’s possible someone else (even outside the organisation) is responsible for taking the case further, and so the user has the opportunity to include 
some other person as the responsible party for carrying out the task in question. 


#### User case 2

The user learns of an event that is going to happen in the future, that the rest of the team needs to know of, that will last for a certain timeframe. T
his could be for example a three day promotion event. The event might not necessitate action from the team, but not knowing about it can also be disadvantageous 
for example from a service point of view. The event can be added as an announcement and will be displayed for the time it’s relevant. In essence, the user is 
able to define a starting date for the event and an ending date.

#### User case 3

The team has crucial information – could be a diagram, map or visuals of physical objects – in photographic form. The photographs need to be uploaded to the 
site with the possibility to add descriptions for them.

## Technologies

### Authentication

- SSO
- Oaut 2.0
- AuthJs

### Frontend

- Framework: Next.js
- Styling: tailwind CSS
- shadcn

### Backend

- Framework: Express
- Node.js
- Typescript

### Database

- Postgres
- DrizzleORM

### Cloud environment

- Frontend Vercel
- Backend: AWS

## UML

### Database


![Screenshot 2025-01-12 at 15 31 54](https://github.com/user-attachments/assets/a6f16161-963d-425b-9d8e-8f94791bd18a)






