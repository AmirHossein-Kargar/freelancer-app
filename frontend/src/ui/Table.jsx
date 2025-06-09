export default function Table({ children }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full w-full text-sm text-left rtl:text-right">
        {children}
      </table>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <thead className="text-xs uppercase bg-surface">
      <tr>{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }) {
  return <tr className="bg-surface">{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
