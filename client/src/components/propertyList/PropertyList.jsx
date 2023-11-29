import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import image1 from './catogories/photo_2.jpg'; 
import image2 from './catogories/dhaba.avif';
import image3 from './catogories/cafe.jpg'
import image4 from './catogories/5star.jpg'
import image5 from './catogories/outdoor.jpg'

const PropertyList = () => {
  const { data, loading, error } = useFetch("/restaurants/countByType");

  
  const catogories = [
    image1,image2,image3,image4,image5
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            catogories.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
