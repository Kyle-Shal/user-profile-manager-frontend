const apiURL = "https://munster-profilemanager-api-5tgazausrq-uc.a.run.app";

// For local testing use this url (or the url of your local server) and comment the one above
// const apiURL = "http://127.0.0.1:8000";

// Function to get users in JSON format and print any errors to the console
async function fetchUsers() {
  try {
    const response = await fetch(`${apiURL}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

function listUsers(userContainerElementId) {
  const userContainerElement = document.getElementById(userContainerElementId);
  // return if empty
  if (!userContainerElement) {
    return;
  }
  console.log("sdfsdf");

  fetchUsers()
    .then((users) => {
      if (!users) {
        userContainerElement.innerHTML = "No Users fetched";
        return;
      }
      console.log(users);
      for (const user of users.msg) {
        userContainerElement.appendChild(postElement(user));
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function postElement(user) {
  const anchorElement = document.createElement("a");

  anchorElement.setAttribute("href", `${apiURL}/${user.id}`);
  anchorElement.setAttribute("target", "_blank");
  anchorElement.innerText = user.given_name;

  const userTitleElement = document.createElement("h3");
  userTitleElement.appendChild(anchorElement);

  return userTitleElement;
}

async function SendJson() {
  const myForm = document.getElementById("myForm");

  // Only uncomment this line to prevent page refreshing

  // myForm.addEventListener("submit", function (e) {
  //   e.preventDefault();
  // });

  const formData = new FormData(myForm);
  console.log("Sending data");
  let data = Object.fromEntries(formData);
  console.log(data);

  let res = await fetch(`${apiURL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);
}
