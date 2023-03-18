# 🚀 WORKING ON
* [x] [Collection ](#task8) @Mar14
* [x] [Components\Notification](#task10) @Mar15
* [x] [Collection error default checked](#task1) @Mar17 
* [x] [Component select / options](##task3) @Mar18
* [ ] [Search styles](#task5) @Mar13 11:10
* [ ] [Bin](#task2) @Mar17 

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
* [x] Add topic | collection in flashcard   
* [x] Search with description 
* [x] Topics page
* [x] Collections page
* [x] Request collection-list
* [x] Topic & Collection detail page (Don't use axios //Call mysql's functions directly)
* [x] Work with MySQL table flashcard_collection_id (flashcard_id, collection_id)
* [x] Topics & Collection page send a request
* [x] Collection pages youtube
* [x] Remove flashcard from collection
* [x] Create View (collection & topic page) MySQL (id, item_id, count)
* [x] Check the selected collection
* [x] Cloud and local data sync
* [x] Responsive header
* [x] Flashcard detail in modal
* [x] Search on typing
* [x] Page search result
* [x] Flashcard detail in Search 
* [x] Debounce search
* [x] Add to collection
* [x] Search reload page
* [x] Change topic
* [x] <a id="task10">Components\Notification</a>
* [x] <a id="task1">Collection error default checked</a>
* [x] <a id="task3">Component select / options</a>
* [ ] <a id="task2">Bin</a> 
* [ ] <a id="task1">Responsive</a>
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>
* [ ] <a id="task5">Styles search</a>
* [ ] Store images ?
 
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
    const debounced = useDebounce(keyword, 1_000);

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