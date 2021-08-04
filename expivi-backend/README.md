# Expivi front-end assessment (backend implementation)
## Please do not modify the backend code.
### Pre-requisites
You should have docker and docker-compose installed on your machine.
Your firewall should also allow docker to communicate over port 3000.

### setup
In order to set up this backend on your machine you'll have to run a couple of shell commands
in succession.
```shell
{projectRoot} $ ./xpv.run.sh start # starts the containers
{projectRoot} $ ./xpv.run.sh run-setup # (re)initializes the database
```

After running these successfully you should be able to navigate your browser to `localhost:3000`
where you will now find a 404 page.

# API Spec
Variables: `{host} = localhost:3000`, `{slug} = item.slug`

### Login flow:
Send a post request to `{host}/api/login` using the following body:

```json
{
    "email": "dev@xpv",
    "password": "password"
}
```

Which when successful will return the following 200 response:
```json
{
    "accessToken": {
        "name": "some-access-token-name",
        "abilities": [
            "*"
        ],
        "tokenable_id": 0,
        "tokenable_type": "App\\Models\\User",
        "updated_at": "some timestamp",
        "created_at": "some timestamp",
        "id": 0
    },
    "plainTextToken": "your-bearer-token-here"
}
```

You can then add the `plainTextToken` to your Authorization header with value:
```javascript
headers['Authorization'] = `Bearer ${response.plainTextToken}`
```
for all further requests.

### Logging out:
You can log out by issuing a **GET** request to `{host}/api/logout`.

### Listing all the currently existing information items:
Send an authenticated **GET** request to {host}/api/items, on success this will return the following response:

```json
[
    {
        "slug": "low-poly-taxi",
        "name": "Low Poly Taxi",
        "category": "Vehicles",
        "license": "CC-0",
        "avatar": "/images/0.png",
        "vertices": 1017,
        "downloads": 43,
        "description": "This is a low poly 3D model of a taxi which is common in The Netherlands."
    },
    {
        "slug": "dodecahedron",
        "name": "Dodecahedron",
        "category": "Shapes",
        "license": "CC-0",
        "avatar": "/images/1.png",
        "vertices": 3184,
        "downloads": 68,
        "description": "This is an artist's interpretation of the classic dodecahedron."
    },
    {
        "slug": "icosahedron",
        "name": "Icosahedron",
        "category": "Shapes",
        "license": "CC-BY-SA",
        "avatar": "/images/4.png",
        "vertices": 2560,
        "downloads": 46,
        "description": "An artistic visualisation of the icosahedron."
    },
    "&more..."
]
```
This is the information that you'll have to display in a clear manner.

### Updating items
Send a **PATCH** request to `{host}/api/items/{slug}` where the slug is given as part of every item under the property slug.
The request body should consist of a json object that contains the properties you want to update + their new value.

Let's say we want to update the amount of downloads, and the description of an item with the slug "`airplane`"
then we would make the following request.

**PATCH**: `{host}/api/items/airplane`
```json
{
    "downloads": 1000000,
    "description": "This airplane was modelled after an alien spacecraft at Area 51"
}
```

The response body would then be the updated item line:
```json
{
    "slug": "airplane",
    "name": "SR-71 Blackbird",
    "category": "Vehicles",
    "license": "CC-0",
    "avatar": "/images/4534548492.png",
    "vertices": 6123,
    "downloads": 1000000,
    "description": "This airplane was modelled after an alien spacecraft at Area 51"
}
```
Good to know is that when uploading a new avatar, you should encode your request as `multipart/form-data`
instead of using `application/json`. The rest stays the same, but you'll then be able to assign an image
the avatar property.

### Deleting items
You can remove items from the backend by issuing a **DELETE** request to `{host}/api/items/{slug}`.
