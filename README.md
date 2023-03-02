# 🚀 WORKING ON
* [x] [Get topic & flashcard in a request](#task2) @Mar01 09:20
* [x] [Topics page](#task5) @Mar01 13:40
* [x] [Refactor reusable components page](#task6) @Mar01 13:50
* [x] [Collections page](#task8) @Mar01 20:00
* [x] [countTopicItem -> groupBy](#task10) @Mar02 14:20
* [x] [useEffect `Collection.js`](#task11) @Mar02 14:50
* [x] [Create flashcard component](#task12) @Mar02 15:10
* [x] [Request collection-list](#task13) @Mar02 15:20
* [x] [Topic & Collection detail page](#task14) @Mar02 16:25 
* [ ] [Collection list (youtube) ](#task9) @Mar02 20:00
* [ ] [Handler error when working with data(create, search, update)](#task15) @Mar02 10:10

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
* [x] Add to collection  
* [x] Topic 

# 💪TODO
* [x] Button update flashcard
* [x] Trả về tất cả sau khi lọc theo chủ đề
* [x] Get topic from database 
* [x] Click outside
* [x] Add topic | collection in flashcard   
* [x] Thể hiện công việc đang làm README.md
* [x] Use svg file
* [x] <a id="task2">Get topic & flashcard in a request</a>
* [x] Search with description 
* [x] Delete feature create collection | topic
* [x] <a id="task6"> Refactor reusable components page</a>
* [x] <a id="task5">Topics page</a>
* [x] <a id="task8">Collections page</a>
* [x] <a id="task10">countTopicItem -> groupBy</a>
* [x] <a id="task11">useEffect `Collection.js`</a>
* [x] <a id="task12">Create flashcard component</a>
* [x] <a id="task13">Request collection-list</a>
* [x] <a id="task14">Topic & Collection detail page (Don't use axios // Call mysql's functions directly)</a>
* [ ] <a id="task9">Collection list(youtube)</a>
* [ ] Flashcard details page (Home & Search)
* [ ] Store images ?
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>
* [ ] Real data
* [ ] Cloud and local data sync
# REFACTOR 
...

# MISC
* [ ] Color + img: term | topic
* [ ] Notification w/ color indicator: created | updated | deleted
* [ ] mobile-friendly: swipes...
* [ ] MySQL => implementations (callback)
* [ ] API => pattern: code (200 | 201 | 400 | 500...), response, getSession()...
* [ ] authentication => user-created | private|public | protected API