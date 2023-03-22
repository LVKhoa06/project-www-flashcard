# 🚀 WORKING ON
* [ ] [ Authentication ](#task1) @Mar22
* [x] [ Flashcard detail term update unique error  ](#task2) @Mar22
* [ ] [ List-collection request ](#task3) @Mar22

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
* [x] Topics & Collection page send a request
* [x] Collection pages youtube
* [x] Remove flashcard from collection
* [x] Check the selected collection
* [x] Flashcard detail in modal
* [x] Search on typing
* [x] Page search result
* [x] Flashcard detail in Search 
* [x] Debounce search
* [x] Add to collection
* [x] Change topic
* [x] Components\Notification
* [x] Bin
* [x] Responsive
* [x] Term unique error
* [x] Select component & option selected
* [x] Check term unique response 0 | 1
* [x] Store images URL | base64
* [x] Change img flashcard
* [x] Check file name is image format
* [ ] <a id="task15">Handler error when working with data(create, search, update)</a>
* [x] <a id="task2">Flashcard detail term update unique error</a> 
* [ ] <a id="task3">List-collection request</a>
* [ ] Topic & collection detail update (`api`)
 
# REFACTOR 
* [x] Refactor folder api & component (), 📝`mysql.js`'s functions name by domain (ex: flashcard_search(), ...topic_getAll, collection_getAll)

# MISC
* [ ] Color + img: term | topic
* [X] Notification w/ color indicator: created | updated | deleted contex
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