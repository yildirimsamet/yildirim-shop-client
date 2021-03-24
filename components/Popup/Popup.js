import stlyes from "./Popup.module.css";
const Popup = ({ setCantGo }) => {
  return (
    <div id="popup" className={stlyes.popupWrapper}>
      <div className={stlyes.popupHeader}>
        <h3>
          Uyarı{" "}
          <span
            onClick={() => {
              setCantGo(false);
              document.getElementById("popup").remove();
            }}
            className={stlyes.closeIcon}
          >
            X
          </span>
        </h3>
      </div>
      <div className={stlyes.popupContent}>
        Site henüz yapım aşamasındadır. Gerçekleşecek bir proje degildir ve
        ürünler sahtedir. Alışveriş yapılamaz kart bilgisi istemez. İlk girişte
        api biraz bekletebilir ücretsiz malum {":)"}
      </div>
    </div>
  );
};
export default Popup;
