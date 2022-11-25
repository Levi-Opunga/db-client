export const allContacts = () =>
    fetch("http://localhost:8081/api/contacts/all")
        .then((response) => response.json())

export const createContacts = (contact) => fetch("http://localhost:8081/api/contacts/create", {
    method: "POST", headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(contact)
})

export const allUsers = () =>
    fetch("http://localhost:8081/api/users/all").then((response) =>
        response.json()
    );
export const oneUser = (id) =>
    fetch(`http://localhost:8081/api/users/one/${id}`).then((response) =>
        response.json()
    );

export const deleteUsers = (id) => fetch(`http://localhost:8081/api/users/delete/${id}`, {
    method: "DELETE"
})
export const deleteContacts = (id) => fetch(`http://localhost:8081/api/contacts/delete/${id}`, {
    method: "DELETE"
})

export const login = (data) =>
    fetch("http://localhost:8081/api/users/validate", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    }).then((response) => response.json());

export const create = (data) =>
    fetch("http://localhost:8081/api/users/create", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    }).then((response) => response.json());

export const editUser = (data) =>
    fetch("http://localhost:8081/api/users/update", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    }).then((response) => response.json());