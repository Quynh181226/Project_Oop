// // TestimonialCard.tsx
// import { motion } from "framer-motion";
// import { Quote } from "lucide-react";
//
// interface TestimonialCardProps {
//     quote: string;
//     author: string;
//     position: string;
//     company: string;
// }
//
// const TestimonialCard = ({ quote, author, position, company }: TestimonialCardProps) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             whileHover={{ y: -5 }}
//             className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 max-w-3xl mx-auto"
//         >
//             {/* Quote icon */}
//             <div className="mb-6">
//                 <Quote className="w-12 h-12 text-red-400" />
//             </div>
//
//             {/* Quote text */}
//             <blockquote className="mb-8">
//                 <p className="text-xl md:text-2xl text-gray-800 leading-relaxed italic font-light">
//                     "{quote}"
//                 </p>
//             </blockquote>
//
//             {/* Author info */}
//             <div className="flex items-center gap-4">
//                 <div className="flex-shrink-0">
//                     <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                         {author.charAt(0)}
//                     </div>
//                 </div>
//                 <div>
//                     <div className="font-semibold text-gray-900 text-lg">{author}</div>
//                     <div className="text-gray-600">{position}</div>
//                     <div className="text-red-600 font-medium">{company}</div>
//                 </div>
//             </div>
//
//             {/* Decorative elements */}
//             <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-red-50 to-transparent rounded-full -z-10" />
//         </motion.div>
//     );
// };
//
// export default TestimonialCard;