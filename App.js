// React Native에서 View 컴포넌트를 import한다.
import { View } from "react-native";
// App 이라는 이름의 함수형 컴포넌트 정의, 이 컴포넌트는 애플리케이션의 주 진입점이 되는 컴포넌트로, 기본적으로 내보내진다.
export default function App() {
  return (
    // React Native의 View 컴포넌트를 사용하여 부모 컨테이너를 만든다.
    <View style={{ flex: 50, flexDirection: "row" }}>
      {/* 첫 번째 자식 View 컴포넌트 생성 */}
      <View style={{ flex: 20, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 20, backgroundColor: "teal" }}></View>
      <View style={{ flex: 10, backgroundColor: "orange" }}></View>
    </View>
  );
}
