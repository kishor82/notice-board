import { useAuth } from "../../utils/AuthProvider";
import Card from "../Card";
import "./index.css";
export const Dashboard = () => {
  const { token } = useAuth();
  const data = [
    {
      image: "http://placeimg.com/400/200/animals",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/tech",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/people",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/nature",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/animals",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/animals",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/animals",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/animals",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
    {
      image: "http://placeimg.com/400/200/cars",
      title: "This is title",
      notice:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, minus sapiente nisi laboriosam natus veniam? Expedita repudiandae dolorum, at nostrum rerum perferendis magni voluptates! Quae sed ipsa quo ex totam.",
      date: "20/2/2022",
    },
  ];
  return (
    <section>
      <div className="item_container">
        <div className="grid_item dashboard_aside">
        <div className="icon"><i className="fa-solid fa-user"></i></div>
          Authenticated as {token}, Dashboard (Protected)
        </div>
        <div className="grid_item">
          <div className="card_container">
            <div className="cards">
              {data.map(({ image, title, date, notice }, index) => (
                <Card
                  key={`card-${index}`}
                  image={image}
                  title={title}
                  date={date}
                  notice={notice}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
