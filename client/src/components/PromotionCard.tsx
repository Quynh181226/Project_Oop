type props = {
    id : number,
    img : string ,
    date : string ,
    title : string
}

export default function PromotionCard(props: props) {
    const { img, date, title } = props
  return (
    <div>
       <div className="border rounded-lg p-3">
      <img src={img} alt={title} className="rounded-md" />
      <p className="text-sm">{date}</p>
      <h3 className="font-bold">{title}</h3>
    </div>
    </div>
  )
}
