import React from "react";
import styled from "styled-components";

const data = [
  { name: "Адам Міцкевіч", bg: "#BC5D58", born: 1798 },
  { name: "Ян Баршчэўскі", bg: "#CB4154", born: 1794 },
  { name: "Вінцэнт Дунін-Марцінкевіч", bg: " #781F19", born: 1808 },
  { name: "Алаіза Пашкевіч (Цётка)", bg: "#aa2436", born: 1876 },
  { name: "Янка Купала", bg: "#C51D34", born: 1882 },
  { name: "Якуб Колас", bg: "#962130", born: 1882 },
  { name: "Францішак Багушэвіч", bg: "#C51D34", born: 1840 },
  { name: "Максім Багдановіч", bg: "#642424", born: 1891 },
];

const Body = styled.div`
  max-width: 2500px;
  margin: auto;
  height: 100vh;
`;

const Items = styled.div`
  background-color: rgb(120, 255, 255);
  height: calc(100vh - 50px);
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

const start = 1790;
const end = 1956;

const Line = styled.div`
  background-color: #00000080;
  position: absolute;
  bottom: 0;
  display: flex;
`;

const Item = styled.div<{ $bg: string; $born: number }>`
  list-style: none;
  background-color: #8c000061;
  min-width: 1270px;
  position: relative;
  margin-left: ${(props) => (props.$born - start) * 60 + "px"};
  cursor: pointer;
  background-color: ${(props) => props.$bg};
  font-size: 10px;
`;

const Header = styled.header`
  height: 50px;
  background-color: #ffb1b1;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  max-width: 2500px;
  margin: auto;
`;

const Year = styled.div`
  width: 60px;
  text-align: center;
`;

const App: React.FC = () => {
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
      return () =>
        window.removeEventListener("wheel", (e) => handler(e, whattype));
    }
  }, []);

  const arr: Array<number> = [];
  let i: number = 0;
  for (let index = start; index < end; index++) {
    i += 1;
    arr.push(start + i);
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
      <Body>
        <Items ref={navRef}>
          <Line>
            {arr.map((data, i) => (
              <Year
                key={i}
                style={{ backgroundColor: data % 2 === 0 ? "#8c00002b" : "" }}
              >
                {data}
              </Year>
            ))}
          </Line>
          <>
            {data.map(({ name, bg, born }) => (
              <Item key={name} $bg={bg} $born={born}>
                {name}
              </Item>
            ))}
          </>
        </Items>
      </Body>
    </>
  );
};

export default App;
