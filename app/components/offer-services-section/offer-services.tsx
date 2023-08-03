import { email } from "../../routes/contact/contact";
import { staticRouteFor } from "../../util/static";
import { ActionButton } from "../action-button/action-button";
import { NarrowContainer } from "../narrow-container/container";
import { Stylesheet } from "../util/stylesheet";

export const colors = {
  green: "--col1: #00bb82; --col2: #00bb820f",
  red: "--col1: #ec5158; --col2: #ec51580f",
  blue: "--col1: #2342ff; --col2: #2342ff0f",
};

export const OfferServices: JSX.Component<{}> = (attrs, children) => <>
  {/* <Stylesheet src={staticRouteFor(__dir.filesByName['offer-services.css']!)} />

  <section class='alt-section'>
    <NarrowContainer>

      <h2>How can I help?</h2>

      <p>Software Developer with 20+ years experience in front-end, back-end and full-stack web development, specializing in TypeScript, React, and Node.</p>

      <p id='offer-services-section'>

        <span style={colors.red}>
          <ActionButton href={contactPage.route}>Consulting</ActionButton>
        </span>

        <span style={colors.green}>
          <ActionButton href={contactPage.route}>Mentoring</ActionButton>
        </span>

        <span style={colors.blue}>
          <ActionButton href={contactPage.route}>Webinars</ActionButton>
        </span>

      </p>

    </NarrowContainer>
  </section> */}
</>;
