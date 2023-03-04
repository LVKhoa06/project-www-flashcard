# Real data @Mon6th

# 🚀 WORKING ON
* [x] [Refactor reusable components page](#task6) @Mar01 13:50
* [x] [Add to collection](#task1) @Mar03 09:10
* [x] [Work with MySQL table flashcard_collection_id (flashcard_id, collection_id)](#task2) @Mar03 13:30
* [x] [ Collection pages youtube) ](#task4) @Mar04 07:15
* [x] [ Delete collection ](#task5) @Mar04 09:00
* [x] [Disable checkbox collection](#task7) @Mar02 10:30
* [ ] [Create View (collection & topic page) MySQL (id, item_id, count) ](#task3) @Mar03 21:00
* [ ] [Handler error when working with data(create, search, update)](#task15) @Mar02 22:10
* [ ] [Check the selected collection](#task6) @Mar02 11:00

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

### Collection
* [x] <a id="task1">Add to collection</a> 
* [x] <a id="task5">Delete collection</a>
* [ ] Rename collection

# 💪TODO
* [x] Button update flashcard
* [x] Trả về tất cả sau khi lọc theo chủ đề
* [x] Get topic from database 
* [x] Click outside
* [x] Add topic | collection in flashcard   
* [x] Thể hiện công việc đang làm README.md
* [x] Use svg file
* [x] Get topic & flashcard in a request
* [x] Search with description 
* [x] Delete feature create collection | topic
* [x] <a id="task6"> Refactor reusable components page</a>
* [x] <a id="task5">Topics page</a>
* [x] <a id="task8">Collections page</a>
* [x] <a id="task10">countTopicItem -> groupBy</a>
* [x] <a id="task11">useEffect `Collection.js`</a>
* [x] <a id="task12">Create flashcard component</a>
* [x] <a id="task13">Request collection-list</a>
* [x] <a id="task14">Topic & Collection detail page (Don't use axios //Call mysql's functions directly)</a>
* [x] <a id="task9">Collection list(youtube)</a>
* [x] <a id="task2">Work with MySQL table flashcard_collection_id (flashcard_id, collection_id)</a>
* [x] Topics & Collection page send a request
* [x] <a id="task2">Collection pages youtube</a>
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>
* [ ] <a id="task2">Create View (collection & topic page) MySQL (id, item_id, count) </a>
* [ ] Store images ?
* [ ] Cloud and local data sync
* [ ] Flashcard details page (Home & Search)
* [ ] <a id="task6">Check the selected collection</a>
* [x] <a id="task7">Disable checkbox collection</a>

# REFACTOR 
* [ ] Refactor folder api & component (), 📝`mysql.js`'s functions name by domain (ex: flashcard_search(), ...topic_getAll, collection_getAll) 


# MISC
* [ ] Color + img: term | topic
* [ ] Notification w/ color indicator: created | updated | deleted
* [ ] mobile-friendly: swipes...
* [ ] MySQL => implementations (callback)
* [ ] API => pattern: code (200 | 201 | 400 | 500...), response, getSession()...
* [ ] authentication => user-created | private|public | protected API