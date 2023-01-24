import { useAnswersState } from "@yext/answers-headless-react";
import { useContext } from "react";
import { ResponsiveContext } from "../../App";
import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from "../../models/cardComponent";
// import renderCardImg from '../../utils/renderCardImg';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

//prettier-ignore
export interface TrainerCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

//prettier-ignore
export interface SimpleImage {
  url: string,
  width: number,
  height: number
}

//prettier-ignore
export interface Image extends SimpleImage {
  sourceUrl: string,
  thumbnails: SimpleImage[]
}

//prettier-ignore
// interface PrimaryPhoto {
//   image?: Image
// }

//prettier-ignore
export interface TrainerData {
  id: any | null | undefined;
  answer: string | undefined;
  name?: string,
  description?:string,
  c_inspirationalQuote?: string,
  //primaryPhoto?: PrimaryPhoto
  photoGallery?:any
}

//prettier-ignore
export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  name?: string,
  description?: string,
  // TODO: why can't I use the tailwind pixels here
  trainerPhoto?: string,
  ctaButton?: string,
  ctaButtonText?: string,
  photoGallery?:any
}

//prettier-ignore
const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col p-4 shadow-sm my-2 align-items-center',
  descriptionContainer: 'w-full text-sm font-heading ',
  name: 'text-xl font-medium font-body font-bold',
  ctaButton: 'flex border rounded-md mt-4 px-4 bg-black justify-center hover:bg-orange-900',
  ctaButtonText: 'font-heading text-black font-bold text-base px-3 py-3 sm:py-0',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function MenuCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  // const trainerImg = trainer.photoGallery?.image?.url ?? '';
  // console.log("tyxdgwhc",trainer)
  //   const smallestThumbnail = trainer.logo?.image?.thumbnails[trainer.logo?.image?.thumbnails.length - 1].url

  const screenSize = useContext(ResponsiveContext);

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
  }
  function renderDescription(description?: string) {
    return <div className={cssClasses.description}>{description}</div>;
  }
  function renderCta(ctaButton?: string) {
    return <div className={cssClasses.ctaButton}>{ctaButton}</div>;
  }

  const isVertical = useAnswersState((s) => s.meta.searchType) === "vertical";
  const imgs = trainer?.photoGallery?.map((img: any) => {
    // console.log('img', img)
    return (
      <>
        <img src={img?.image?.url} />
      </>
    );
  });

  return (
    <>
      {/* <div>
        {trainer.name}
        {imgs}
      </div> */}

      <div>
        <div className="centered-container">
          <div className="section">
            <div
              className="bg100 p-2"
              style={{ color: "blue", fontFamily: "cursive" }}
            >
              {renderName(trainer.name)}
              <br />
            </div>
            <div
              className="bg100 p-2"
              style={{margin: "5px",width:"450px",height:"250px" }}
            >
            
            <p>{imgs}</p></div>
            <div
              className="bg-blue-100 p-2"
              style={{ borderRadius:"10px",color: "black", fontFamily: "cursive" ,margin: "5px" ,width:"450px"}}
            >{renderDescription(trainer.description)}
            </div>
            <button type="button" className="bg-green-400 p-2"  style={{ borderRadius:"10px",color: "white"}}>Order Now</button>
          </div>
          {/* <div>{imgs}</div> */}
        </div>
      </div>
    </>
  );
}
