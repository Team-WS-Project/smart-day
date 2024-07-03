import { useNavigate } from "react-router-dom";
import ListContainer from "../../components/PageComponents/ListContainer/ListContainer";
import { div1, div2, div3, text1, text2, text3 } from "./MainPage.css";

const MainPage = () => {
    const navigate = useNavigate();

    const textClick = () => {
        navigate("/calendar");
    };

    return(
        <div>
            <div>
                // header
                <div className={div2}>
                    <br />
                    현재 지역은 location 입니다.
                </div>
                <div className={div1}>
                    <ListContainer/>
                </div>
                <div className={div3}>
                    <text className={text1}>+ 월별 일정 추가</text>
                    <text className={text2}>오늘은 날씨가 weather이므로, textObj 하시는건 어때요?</text>
                    <text
                        className={text3}
                        onClick={textClick}
                    >전체 달력 보기</text>
                </div>
            </div>
            <br />
            // footer
        </div>
    )
};

export default MainPage;
