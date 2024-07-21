import { v4 as uuidv4 } from "uuid";
import { PayslipCardProps } from "./components/PayslipCard";
import getRandomDate from "./utils/getRandomDate";

const TOTAL_NO_OF_PAYSLIPS = 50;

export const data: PayslipCardProps[] = Array.from(
  { length: TOTAL_NO_OF_PAYSLIPS },
  () => ({
    id: uuidv4(),
    fromDate: getRandomDate(new Date(2021, 0, 1), new Date(2021, 0, 15)),
    toDate: getRandomDate(new Date(2021, 0, 16), new Date(2022, 0, 1)),
    // We are using the picsum API to generate random images. It needs an id to generate an unique image each time.
    fileUrl: `https://picsum.photos/id/${
      Math.floor(Math.random() * 201) + 100
    }/300/300?grayscale?`,
  })
);
