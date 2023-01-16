import { createRef, useState, useCallback, useEffect } from "react";
import Input from "../../Components/Input";

const Database = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [occ, setOcc] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [flow, setFlow] = useState("add");
  const [editUserId, setEditUserId] = useState("");
  const nameRef = createRef(null);

  const clearInputs = useCallback(() => {
    [setName, setAge, setCity, setOcc].forEach((inp) => inp(""));
  }, []);

  const deleteUser = useCallback(
    (id) => {
      const confirmDeleteAction = window.confirm(
        `Are you sure want to delete?`
      );
      if (confirmDeleteAction) {
        const newData = users.filter((user) => user.id != id);
        localStorage.setItem("users", JSON.stringify(newData));
        setUsers([...newData]);
      }
    },
    [users]
  );

  const addUser = useCallback(
    (e) => {
      e.preventDefault();
      if (name && age && city && occ) {
        let newUsers = [];
        if (flow === "update") {
          for (let i = 0; i < users.length; i++) {
            if (editUserId === users[i].id) {
              users[i] = {
                id: editUserId,
                name,
                age,
                city,
                occ,
              };
              break;
            }
          }
          newUsers = [...users];
        } else {
          const newUser = {
            name,
            age,
            city,
            occ,
            id: new Date().getTime().toString(36),
          };
          newUsers = [...users, newUser];
        }
        localStorage.setItem("users", JSON.stringify(newUsers));
        setUsers(newUsers);
        clearInputs();
        toggleForm(true);
        setEditUserId("");
      } else {
        alert("Please fill all the data");
      }
    },
    [name, age, city, occ]
  );

  const toggleForm = useCallback(
    () => setShowEditForm((flag) => !flag),
    [showEditForm]
  );

  const editUser = useCallback(
    (id) => {
      const { name, age, city, occ } = users.find((user) => user.id == id);
      toggleForm(true);
      setFlow("update");
      setEditUserId(id);
      setName(name);
      setAge(age);
      setCity(city);
      setOcc(occ);
    },
    [flow, showEditForm, users]
  );

  const addNewUser = useCallback(() => {
    toggleForm();
    setFlow("add");
  }, [flow, showEditForm]);

  useEffect(() => {
    const lsData = JSON.parse(localStorage.getItem("users")) || [];
    lsData.length && setUsers([...lsData]);
  }, []);

  useEffect(() => {
    if (showEditForm) {
      console.log("coming edit fomr");
      nameRef.current.focus();
    }
  }, [showEditForm]);

  return (
    <div className="user-details-sec">
      <h1>Database</h1>
      {!showEditForm ? (
        <div className="users">
          {users.length
            ? users.map((user, index) => {
                return (
                  <article key={index} className="user">
                    <div className="user-details">
                      <span>Name : {user.name}</span>
                      <span>Age : {user.age}</span>
                      <span>Occupation : {user.occ}</span>
                      <span>City : {user.city}</span>
                    </div>
                    <div className="update-actions">
                      <img
                        onClick={() => editUser(user.id)}
                        src="https://w7.pngwing.com/pngs/613/900/png-transparent-computer-icons-editing-delete-button-miscellaneous-angle-logo.png"
                      />
                      <img
                        onClick={() => deleteUser(user.id)}
                        src="https://www.pngitem.com/pimgs/m/31-314793_free-delete-icon-png-edit-and-delete-icons.png"
                      />
                    </div>
                  </article>
                );
              })
            : null}
        </div>
      ) : null}
      {showEditForm ? (
        <form className="add-user-details-form">
          <Input
            ref={nameRef}
            value={name}
            onChange={setName}
            placeholder="Name"
          />
          <Input value={age} onChange={setAge} placeholder="Age" />
          <Input value={occ} onChange={setOcc} placeholder="Occupation" />
          <Input value={city} onChange={setCity} placeholder="City" />
          <button onClick={addUser} className="add-user-details-btn">
            {flow}
          </button>
        </form>
      ) : (
        <button onClick={addNewUser}>Add User</button>
      )}
    </div>
  );
};

export default Database;
