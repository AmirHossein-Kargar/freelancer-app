import useUser from "../features/authentication/useUser";

export default function Header() {
    const {data} = useUser();
    
  return (
      <section>App Header</section>
  )
}
