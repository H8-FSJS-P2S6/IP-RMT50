import { Ripple, initMDB } from "mdb-ui-kit";
import propTypes from 'prop-types'
initMDB({ Ripple });

export const GroceryCard = ({grocery, handdleDelete}) => {
        
return <div>
<div className="card" style={{width : "18rem"}}>
  <div
    className="bg-image hover-overlay"
    data-mdb-ripple-init=""
    data-mdb-ripple-color="light"
  >
    
    <img
      src={grocery.imageUrl}
      className="img-fluid"
    />
    <a href="#!">
      <div
        className="mask"
        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
      />
    </a>
  </div>
  <div className="card-body">
    <h5 className="card-title">{grocery.title}</h5>
    <p className="card-text">
      {grocery.price}
    </p>
    <p className="card-text">
      {grocery.tag}
    </p>
    <button  className="btn btn-danger" data-mdb-ripple-init="" onClick={()=>handdleDelete({grocery})}>
      Delete
    </button>
  </div>
</div>
</div>
}

GroceryCard.propTypes = {
  handdleDelete:propTypes.func.isRequired,
    grocery: propTypes.shape({
        id: propTypes.number.isRequired,
        title: propTypes.string.isRequired,
        price: propTypes.number.isRequired,
        tag: propTypes.string.isRequired,
        imageUrl: propTypes.string.isRequired,
        UserId: propTypes.number.isRequired,
        createdAt: propTypes.string.isRequired,
        updatedAt: propTypes.string.isRequired
    })
}