# 🚀 WORKING ON
* [x] [ Flashcard details ](#task10) @Mar08 09:20
* [ ] [ Styles responsive ](#task1) w/ `SASS` | `Tailwind` | `styled-components` @Mar09 18:00
* [x] [ Add favicon ](#task2) @Mar10 10:20
* [x] [ Font family input & textarea ](#task3) @Mar10 10:40
* [x] [ Styles scrollbar ](#task4) @Mar10 10:50
* [ ] [ Input description use `<textarea></textarea>` ](#task5) @Mar10 11:00

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
* [x] Delete collection
* [x] <a id="task7">Rename collection</a>

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
* [x] Topics page
* [x] Collections page
* [x] countTopicItem -> groupBy
* [x] <a id="task11">useEffect `Collection.js`</a>
* [x] <a id="task12">Create flashcard component</a>
* [x] <a id="task13">Request collection-list</a>
* [x] <a id="task14">Topic & Collection detail page (Don't use axios //Call mysql's functions directly)</a>
* [x] Work with MySQL table flashcard_collection_id (flashcard_id, collection_id)
* [x] Topics & Collection page send a request
* [x] Collection pages youtube
* [x] Remove flashcard from collection
* [x] Create View (collection & topic page) MySQL (id, item_id, count)
* [x] Check the selected collection
* [x] Add Page title
* [x] <a id="task2">Add Favicon</a>
* [x] <a id="task3">Font family input & textarea</a>
* [x] <a id="task4">Styles scrollbar</a>
* [x] Cloud and local data sync
* [ ] <a id="task5">Input description use `<textarea></textarea>`</a>
* [ ] Flashcard detail in modal
* [ ] Store images ?
* [ ] Unique flashcard in collection
* [ ] <a id="task1">Responsive</a>
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>




# REFACTOR 
* [x] <a id="task9">Refactor folder api & component (), 📝`mysql.js`'s functions name by domain (ex: flashcard_search(), ...topic_getAll, collection_getAll)</a> 

# MISC
* [ ] Color + img: term | topic
* [ ] Notification w/ color indicator: created | updated | deleted
* [ ] mobile-friendly: swipes...
* [ ] MySQL => implementations (callback)
* [ ] API => pattern: code (200 | 201 | 400 | 500...), response, getSession()...
* [ ] authentication => user-created | private|public | protected API

# 💻 Snippet to work with async task
```jsx
// Flag
const [busy, setBusy] = useState(false);

useEffect(() => {
    if (busy)
        return alert('Another task is under progress.');
    
    setBusy(true);

    const worker = async() => {
        try {
            // Some async task: await foo()
        } catch(ex) {

        } finally {
            setBusy(false);
        } // finally
    } // worker

    worker();
}, [dependency]);
```