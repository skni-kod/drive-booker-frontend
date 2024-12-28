import CourseCard from './CourseCard';
import { Course } from './fetchCourses';

export function CoursesList({ courses }: { courses: Course[] }) {
  if (!courses.length) {
    return (
      <p className='text-center text-gray-500'>
        Obecnie nie ma zapisów na nowe kursy.
      </p>
    );
  }
  return (
    <div className='flex w-5/6 max-w-4xl flex-col gap-2'>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          name={course.school.name}
          category={course.category.name}
          address={course.school.address}
          date={course.start_date}
          price={course.price}
        />
      ))}
    </div>
  );
}