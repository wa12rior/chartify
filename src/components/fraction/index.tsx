interface FractionProps {
  n: number;
  d: number;
  s: number;
}

export const Fraction: React.FC<FractionProps> = ({ n, d, s }) => {
  return n == 0 ? (
    <>0</>
  ) : n % d == 0 ? (
    <>
      {s == -1 ? "-" : ""}
      {n / d}
    </>
  ) : (
    <>
      {s == -1 ? "-" : ""}
      {`${n}/${d}`}
    </>
  );
};
