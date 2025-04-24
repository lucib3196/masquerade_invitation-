import ColorWheel from "./components/ColorWheel";
import DrawingBoard from "./components/DrawingBoard";
import "./globals.css";
import ImageBoard from "./ImageBoard";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-center font-bold underline">
        Gala Invitation
      </h1>

     <ImageBoard />
    </>
  );
}
