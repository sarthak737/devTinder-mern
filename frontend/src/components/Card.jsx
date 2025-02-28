const Card = ({ user }) => {
  return (
    <div>
      <div className="card bg-ghost-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={user.photoUrl} alt="user" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.firstName}</h2>
          <p>Age: {user.age}</p>
          <div className="card-actions">
            <button className="btn btn-secondary">Send req</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
