import styles from './styles.module.css';

interface Props {
  text: string;
}

export const ExampleComponent = ({ text }: Props) => (
  <div className={styles.test}>Example Component: {text}</div>
);
