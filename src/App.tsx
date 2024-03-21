import React from "react";
import styled from "styled-components";

const data = [
  { name: "Адам Міцкевіч" },
  { name: "Ян Баршчэўскі" },
  { name: "Вінцэнт Дунін-Марцінкевіч" },
  { name: "Элаіза Пашкевіч (Цётка)" },
  { name: "Янка Купала" },
  { name: "Якуб Колас" },
  { name: "Францішак Багушэвіч" },
  { name: "Максім Багдановіч" },
];

const Body = styled.div<{ $height: number }>`
  max-width: 2500px;
  margin: auto;
  height: ${(props) => props.$height + "px"};
`;

const Items = styled.div`
  background-color: rgb(120, 255, 255);
  display: flex;
  gap: 1px;
  overflow-x: scroll;
  position: sticky;
  position: -webkit-sticky;
  //scrollbar-width: none;
  top: 50px;
  // -ms-overflow-style: none;
  /* &::-webkit-scrollbar {
    width: 0;
  }*/
`;

const Line = styled.div`
  background-color: #00000080;
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 30px;
`;

const Item = styled.div`
  list-style: none;
  background-color: #8c000061;
  padding: 50px;
  height: calc(100vh - 70px);
  min-width: 500px;
  width: 100%;
  position: relative;
`;

const Header = styled.header`
  height: 50px;
  background-color: #ffb1b1;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
`;

const start = 1797;
const end = 1956;
const countEl = end - start;

const HeaderWrapper = styled.div`
  max-width: 2500px;
  margin: auto;
`;

const App: React.FC = () => {
  const [size, setSize] = React.useState<number>(0);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (event: WheelEvent, whattype: HTMLDivElement) => {
      return whattype.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    };
    if (navRef.current) {
      const whattype = navRef.current;
      window.addEventListener("wheel", (e) => handler(e, whattype));
      setSize(navRef.current.scrollWidth);
      //navRef.current.scrollLeft += scrollTop;
      return () =>
        window.removeEventListener("wheel", (e) => handler(e, whattype));
    }
  }, [size]);

  const arr: Array<number> = [];
  let i: number = 0;
  for (let index = start; index < end; index++) {
    i += 1;
    arr.push(start + i);
    console.log(start + i);
  }

  return (
    <>
      <Header>
        <HeaderWrapper>
          <ul>
            <li>выбраць дзеяча літаратуры</li>
          </ul>
        </HeaderWrapper>
      </Header>
      <Body $height={size}>
        <Items ref={navRef}>
          <Line>
            {arr.map((data, i) => (
              <div key={i}>{data}</div>
            ))}
          </Line>
          <>
            {data.map(({ name }) => (
              <Item key={name}>{name}</Item>
            ))}
          </>
        </Items>
      </Body>
    </>
  );
};

export default App;
