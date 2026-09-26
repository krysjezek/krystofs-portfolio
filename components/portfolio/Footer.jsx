import { ExternalLink } from "./Links";
import EmailCopy from "./EmailCopy";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>{new Date().getFullYear()}</p>
      <nav aria-label="Contact and social links">
        <EmailCopy>Email</EmailCopy>
        <ExternalLink href="https://x.com/krysjezek">X</ExternalLink>
        <ExternalLink href="https://www.instagram.com/krystof.jezek/">
          Instagram
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/krystofjezek/">
          LinkedIn
        </ExternalLink>
        <ExternalLink href="https://github.com/krysjezek">Github</ExternalLink>
      </nav>
    </footer>
  );
}
