import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks, setAck }) => {
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    const Priority = priority;
    const status = "todo";

    const data = { title, description, deadline, Priority, status };

    fetch("https://task-manager-backend-8vlr.onrender.com/create-task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setAck(data.acknowledged));
    form.reset();
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Create Post
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">Information</h3>
          <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                name="title"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Your bio</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 w-full max-w-xs"
                name="description"
                placeholder="Bio"
              ></textarea>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Deadline</span>
              </div>
              <input
                type="date"
                placeholder="Type here"
                name="deadline"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">High Priority</span>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={(e) => setPriority(e.target.value)}
                  className="radio"
                />
              </label>

              <label className="label cursor-pointer">
                <span className="label-text">Low Priority</span>
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={(e) => setPriority(e.target.value)}
                  className="radio"
                />
              </label>
            </div>
            <button className="btn btn-success">Success</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateTask;
