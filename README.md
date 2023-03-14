# 🚀 WORKING ON
* [x] [ Flashcard details ](#task10) @Mar08 09:20
* [x] [ Search on typing ](#task4) @Mar13 09:45
* [x] [ Click overlay close modal, menu, search](#task2) @Mar13 09:45
* [ ] [ Search styles](#task5) @Mar13 11:10
* [x] [Search detail flashcard](#task1) @Mar13
* [x] [Page search result](#task3) @Mar14 08:00
* [x] [Debounce search](#task6) @Mar14 09:20

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
* [x] useEffect `Collection.js`
* [x] Create flashcard component
* [x] Request collection-list
* [x] Topic & Collection detail page (Don't use axios //Call mysql's functions directly)
* [x] Work with MySQL table flashcard_collection_id (flashcard_id, collection_id)
* [x] Topics & Collection page send a request
* [x] Collection pages youtube
* [x] Remove flashcard from collection
* [x] Create View (collection & topic page) MySQL (id, item_id, count)
* [x] Check the selected collection
* [x] Add Page title
* [x] Add Favicon
* [x] Font family input & textarea
* [x] Styles scrollbar
* [x] Cloud and local data sync
* [x] Input description use `<textarea></textarea>`
* [x] Responsive header
* [x] Flashcard detail in modal
* [x] <a id="task4">Search on typing</a>
* [x] <a id="task3">Page search result</a>
* [x] <a id="task2">Click overlay close modal, menu, search</a>
* [x] Textarea max width + height
* [x] <a  id="task1">Search detail flashcard</a>
* [x] <a  id="task6">Debounce search</a> 
* [ ] Store images ?
* [ ] Unique flashcard in collection
* [ ] <a id="task1">Responsive</a>
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>
* [ ] <a id="task8">Components\Notification</a>
* [ ] Change topic
* [ ] <a id="task5">Styles search</a>
 
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

# Snippet to work with `useDebounce()` hook
```jsx
import { useState } from 'react';
import useDebounce from 'lib/debounce';

export default function Component() {
    const [keyword, setKeyword] = useState('');
    const [debounced, setDebounced] = useDebounce(keyword, 1_000);

    useEffect(() => {
        const request = async() => {

        } // request

        request();
    }, [debounced]);

    return <>
        <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
        />
    </>
} // Component
```