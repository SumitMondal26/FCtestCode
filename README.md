# js-assignment

````
instructions.txt has the instructions to run the service
guidelines.txt has the guidelines to be followed while solving and submitting the assignment
problem-statement.txt has the problems statements to be solved
````

# Problem 1

```
Endpoint /tour/matches returns all the matches for a given tour name.
The endpoint latency increases linearly with the number of tours. Modify the endpoint to increase the performance.
```

# solution

    1. noticed endpoint returning wrong output (returned tours instead of matches of asked tours )
    2. increasing performance depends on multiple scopes and levels.
        1. tables can be indexed on most frequent queried column
        2. data can be cached and cache-fetched to prevent redundant read opertions for table with less writes operations.
        3. master-slave db architecture with sharded clusters.
        4. scaling probelem can be fixed with choice of better performing db solution.

# Problem 2

```
Modify the endpoint /sport/tour/match to also return match's id, startTime and format
```

# solution

    query needed to adjust to return reuired values and output object needed to be adjusted for new format.

# Problem 3

```
Requirement: News Support for Matches and Tours
Functional Requirements:
    1. News can be created for a match or a tour.
    2. Each news created for a match also belongs to the corresponding tour.
    3. Each news created for a tour also belongs to the corresponding sport.
Technical Requirements:
    1. Create an endpoint to create news.
    2. Create an endpoint to fetch news by match id
    3. Create an endpoint to fetch news by tour id
    4. Create an endpoint to fetch news by sport id
```

# solution

    1. new routes , controller , model function are added for CRUD news feature.
    2. news table is indexed for faster fetches.
