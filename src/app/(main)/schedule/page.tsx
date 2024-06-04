import CTAConnect from '@/components/CTAConnect';
import ScheduleComponent from './ScheduleComponent'

const Schedule = () => {
  return(
    <article className="article">
      <h2 className="subtitle-header">Расписание занятий</h2>
      <ScheduleComponent />
      {/* <CTAConnect call='Напишите нам, чтобы записаться на занятие' title='Записаться' /> */}
    </article>
  )
};

export default Schedule;