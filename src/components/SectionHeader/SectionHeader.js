import './SectionHeader.css'

function SectionHeader({children}) {
  return (
    <h2 className="section-header">{children}</h2>
  );
}

export default SectionHeader;