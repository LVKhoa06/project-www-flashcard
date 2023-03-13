# 🚀 WORKING ON
* [x] [ Flashcard details ](#task10) @Mar08 09:20
* [x] [ Styles responsive ](#task1) w/ `SASS` | `Tailwind` | `styled-components` @Mar09 18:00
* [ ] [Click overlay close modal, menu, search](#task2) @Mar13 
* [ ] [Textarea max width + height](#task3) @Mar13 09:30
# 🍀 NOTE
🟢 Axios `DELETE` method use axios.delete(`api/url?id=${id}`) 
🟢 Display Component ({&& <Component />})

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
* [x] Rename collection

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
* [x] Refactor reusable components page
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
* [x] Add Favicon
* [x] Font family input & textarea
* [x] <a id="task4">Styles scrollbar</a>
* [x] Cloud and local data sync
* [x] <a id="task5">Input description use `<textarea></textarea>`</a>
* [x] <a id="task6">Responsive header</a>
* [x] <a id="task7">Flashcard detail in modal</a>
* [ ] Store images ?
* [ ] Unique flashcard in collection
* [ ] <a id="task1">Responsive</a>
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>
* [ ] <a id="task8">Components\Notification</a>
* [ ] Click overlay close modal, menu, search
* [ ] Textarea max width + height
* [ ] Search detail flashcard
* [ ] Change topic
* [ ] Styles search
* [ ] Topics id -1 change color (use class)

# REFACTOR 
* [x] Refactor folder api & component (), 📝`mysql.js`'s functions name by domain (ex: flashcard_search(), ...topic_getAll, collection_getAll)

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