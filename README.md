# 🍀 NOTE
🟢 Axios `DELETE` method use axios.delete(`api/url?id=${id}`)

# ⚙ FEATURE
###  Flashcard
* [x] Create flashcard
* [x] Delete flashcard
* [x] Update flashcard

### Sort & filter flashcard
* [x] Sort by alphabetically [DESC | ASC]
* [x] Sort by creation_time [DESC | ASC]
* [x] Only get flashcards in topic
* [x] Search flashcard term & description
* [ ] Flashcard details page (Home & Search)

### Collection
* [ ] Add to collection (youtube) 
* [ ] Topic 

# 💪TODO
* [x] Button update flashcard
* [x] Trả về tất cả sau khi lọc theo chủ đề
* [x] Get topic from database 
* [x] Click outside
* [x] Add topic | collection in flashcard   

* [ ] Store images ?
* [ ] Handler error (create, search, update)
* [ ] Get topic name from MySQL
* [ ] Use svg file

# REFACTOR 
...

# MISC
* [ ] Color + img: term | topic
* [ ] Notification w/ color indicator: created | updated | deleted
* [ ] mobile-friendly: swipes...
* [ ] MySQL => implementations (callback)
* [ ] API => pattern: code (200 | 201 | 400 | 500...), response, getSession()...
* [ ] authentication => user-created | private|public | protected API

card | list

flashcard/term ?


/topic/-----[id]
    IT              English
20 flashcard       30 flashcard  


/collection/-----[id]
    foo                      bar
 10 flashcard             5 flashcard

