import moment from 'moment';
export const getStartTimeOfDay = function(aDate) {
  if (aDate instanceof Date) {
    var newDate = new Date(aDate);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  }
  return null;
};

export const getEndTimeOfDay = function(aDate) {
  if (aDate instanceof Date) {
    var newDate = new Date(aDate);
    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);
    newDate.setMilliseconds(999);
    return newDate;
  }
  return null;
};

/**
 * 生成指定天数前到今天结束的时间范围
 * NOTE 当天: daysToToday = 0 ｜ 昨天: daysToToday = 1 ｜ 最近7天：daysToToday = 6 ｜  最近30天: daysToToday = 29
 * @param daysToToday 多少天前
 * @result {Array}
 */
export const getRangeDateToToday = function(daysToToday = 6) {
  const start = getStartTimeOfDay(new Date());
  const end = getEndTimeOfDay(new Date());
  start.setTime(start.getTime() - daysToToday * 24 * 3600 * 1000);
  return [start, end];
};

/**
 * 生成上个月初到月末的时间范围
 * @param toMonth 1：上个月初/月末 ｜ 0: 本月月初/月末 ｜ -1:下个月初/月末
 * @param formatType 格式化类型
 * @result {Array}
 */
export const getRangeDateToMonth = function(
  toMonth = 1,
  formatType = 'YYYY-MM-DD HH:mm:ss'
) {
  // 上x个月初
  const beginOfMonth = moment(new Date())
    .startOf('month')
    .subtract(1, 'month')
    .format('YYYY-MM-DD HH:mm:ss');

  // 上x个月末
  const endOfMonth = moment(new Date())
    .endOf('month')
    .subtract(1, 'month')
    .endOf('month')
    .format('YYYY-MM-DD HH:mm:ss');

  return [beginOfMonth, endOfMonth];
};
