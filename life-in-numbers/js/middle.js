// ************
//  constants
// ************
const DAYS_PER_YEAR = 365;
const MONTHS_PER_YEAR = 12;
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = DAYS_PER_YEAR / MONTHS_PER_YEAR;
const HOURS_PER_DAY = 24;
const WEEKS_PER_YEAR = DAYS_PER_YEAR / DAYS_PER_WEEK;
const PRE_COLLEGE_YEARS = 12;
const COLLEGE_YEARS = 4;
const YEARS_IN_SCHOOL = PRE_COLLEGE_YEARS + COLLEGE_YEARS;
const COLLEGE_START_AGE = 18;
const CHILDHOOD_YEARS = 18;

// ************
//  variables
// ************
let is_winning_message_shown = false;
let toggles={};
let variables_to_update = [];
let dependent_variables_to_update =[];

let win_width = window.innerWidth;
let win_height = window.innerHeight;
let td_width = win_width > 1024 ? (win_width - 30) / 2 : 1024 / 2;
let page_width = win_width > 1024 ? (win_width - 30) : 1024;

let timechart_top = 0;
let cashchart_top = 0;

let max_age = 100;
let adulthood = () => { return max_age - work_start_age };
let rent_paying_years = ()=>{return isApartmentBought()? ageBoughtApartment()-work_start_age :adulthood() };
let total_hours = () => { return max_age * DAYS_PER_YEAR * HOURS_PER_DAY };
let work_start_age = 22;
let work_end_age = 60;
let work_years = () => { return toggles["toggle_startup"]==1?age_quit_job-work_start_age:work_end_age - work_start_age };
let max_work_years = () =>{ return work_end_age - work_start_age};
let retirement_years = () => { return max_age - work_end_age };
let work_hours_per_day = 8;
let paid_holidays = 10;
let national_holidays = 10;
let work_days_per_week = 5;
let total_work_hours = () => { return work_years() * (WEEKS_PER_YEAR * work_days_per_week - paid_holidays - national_holidays) * work_hours_per_day };
let total_paid_work_hours = () => { return work_years() * (WEEKS_PER_YEAR * work_days_per_week - national_holidays) * work_hours_per_day };
let work_percent = () => { return fix(total_work_hours() / total_hours() * 100, 1) };
let sleep_hours = 10;
let sleep_percent = () => { return fix(sleep_hours / HOURS_PER_DAY * 100) };
let commute_hours = 5;
let four_things_combined_percentage = () => { return fix((work_hours_per_day + food_hours + commute_hours + sleep_hours) / HOURS_PER_DAY * 100, 0) }
let work_day_hours_left = () => { return HOURS_PER_DAY - (work_hours_per_day + food_hours + commute_hours + sleep_hours) }
let morning_study_hour = 3;
let afternoon_study_hour = 3;
let evening_study_hour = 3;
let total_study_hour_per_day = () => { return morning_study_hour + afternoon_study_hour + evening_study_hour };
let summer_vacation = 90;
let winter_vacation = 40;
let vacation_study_hours = 2;
let total_study_hours = ()=>{return total_study_hour_per_day() * (DAYS_PER_YEAR-summer_vacation-winter_vacation) * YEARS_IN_SCHOOL+(summer_vacation+winter_vacation)*vacation_study_hours*YEARS_IN_SCHOOL};
let video_game_start_age = 3;
let actual_play_time = 2;
let play_time_after_working = 1;
let reading_hours = 1;
let meals_per_day = 3;
let food_hours = 2;
let food_hours_in_years = ()=>{return fix(food_hours / 24 * max_age, 0)};
let total_video_game_hours = () => { return toggles["toggle_video_games"] == 1 ? actual_play_time * DAYS_PER_YEAR * (COLLEGE_START_AGE - video_game_start_age) + (max_age - COLLEGE_START_AGE) * play_time_after_working * DAYS_PER_YEAR : 0 }
let fall_in_love_age = 30;
let long_last_relationship_hours_per_day = 2;
let total_long_last_relationship_hours = () => { return toggles["toggle_love"] == 1 ? long_last_relationship_hours_per_day * (max_age - fall_in_love_age) * DAYS_PER_YEAR : 0 };
let dating_apps_start_age = 20;
let dating_apps_end_age = 29;
let dating_apps_daily_time = 2;
let total_dating_apps_hours = () => { return toggles["toggle_dating_apps"] == 1 ? (dating_apps_end_age - dating_apps_start_age) * DAYS_PER_YEAR * dating_apps_daily_time : 0 }
let age_social_media_appeared = 19;
let social_media_hours_per_day = 5;
let social_media_give_up_age = 35;
let total_social_media_hours = () => { return toggles["toggle_social_media"] == 1 ? (social_media_give_up_age - age_social_media_appeared) * DAYS_PER_YEAR * social_media_hours_per_day : 0 };
let age_rediscovered_learning = 28;
let lifelong_study_hour_per_day = 2;
let total_lifelong_learning_hours = () => {
  return toggles["toggle_lifelong_learning"] == 1 ? (max_age - age_rediscovered_learning) * DAYS_PER_YEAR * lifelong_study_hour_per_day : 0;
}
let first_relationship_months = 5;
let first_relationship_hours_per_day = 8;
let first_relationship_total_hours = () => { return toggles["toggle_first_relationship"] == 1 ? fix(first_relationship_hours_per_day * first_relationship_months * DAYS_PER_MONTH, 0) : 0 };
let too_old_to_play_sports_age = ()=>{return max_age-10};
let first_sports_age = 26;
let total_sports_years = ()=> {return too_old_to_play_sports_age()-first_sports_age};
let sports_session_per_week = 2;
let sports_hours_per_session = 2;
let total_sports_hours = ()=>{return toggles["toggle_sports"] == 1?WEEKS_PER_YEAR*total_sports_years()*sports_session_per_week*sports_hours_per_session:0};
let hours_left = () => {
  let balance = total_hours();
  for (let key in hours_used) {
    if (key != "Free time") balance -= hours_used[key]();
  }
  return balance;
}
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@          
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
//       @@@@@@@@@          @@@@@@@@@@@   
//       @@@@@@@@@            @@@@@@@@@(  
//       @@@@@@@@@            @@@@@@@@@@  
//       @@@@@@@@@            @@@@@@@@@   
//       @@@@@@@@@          @@@@@@@@@@    
//       @@@@@@@@@@@@@@@@@@@@@@@@@@@      
//       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
//       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
//       @@@@@@@@@             @@@@@@@@@@@
//       @@@@@@@@@              ,@@@@@@@@@
//       @@@@@@@@@               @@@@@@@@@
//       @@@@@@@@@              ,@@@@@@@@@
//       @@@@@@@@@             @@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
let hourly_rate = 7.5;
let lifetime_work_income = () => { return fix(total_paid_work_hours() * hourly_rate, 0) };
let each_meal_cost = 6;
let food_monthly = () => { return fix(DAYS_PER_MONTH * each_meal_cost * meals_per_day, 0) };
let rent_monthly_in_hundreds = 7;
let rent_lifetime_cost = ()=>{return rent_monthly_in_hundreds * 100 * MONTHS_PER_YEAR * rent_paying_years();};
let insurance_monthly = 2;
let insurance_monthly_dependent = ()=>{return insurance_monthly}
let insurance_lifetime = () => { return monthly2Lifetime(insurance_monthly*100) };
let public_transportation_monthly = 100;
let wireless_internet_monthly = 90;
let drinks_per_day = 10;
let cost_per_drink = 6;
let drink_monthly = () => { return fix(DAYS_PER_MONTH * drinks_per_day * cost_per_drink, 0) }
let monthly_income = () => { return fix(lifetime_work_income() / work_years() / MONTHS_PER_YEAR, 0) };
let tax_percentage = 50;
let tax_start_point = 1;
let tax_monthly = () => { return fix(remove_negative(monthly_income() - tax_start_point * 1000) * tax_percentage / 100,0) };
let tax_startup = ()=>{return toggles["toggle_startup"] == 1 ?startup_total_income()*tax_percentage/100 :0}
let tax_lifetime = () => { return tax_monthly() * work_years() * MONTHS_PER_YEAR + tax_startup() }
let retirement_saving_percentage = 10;
let retirement_monthly_cost = () => { return fix(retirement_saving_percentage / 100 * monthly_income(), 0) };
let retirement_cost_lifetime = () => { return retirement_monthly_cost() * max_work_years() * MONTHS_PER_YEAR };
let retirement_income_percentage = 70;
let retirement_income_monthly = () => { return fix(monthly_income() * retirement_income_percentage / 100, 0) };
let total_retirement_income = () => { return retirement_income_monthly() * MONTHS_PER_YEAR * retirement_years() }
let clothing_monthly = 50;
let clothing_monthly_dependent = ()=>{return clothing_monthly};
let child_subsidy_monthly = 2;
let education_monthly = 5;
let total_child_cost = ()=>{return toggles["toggle_child"] == 1 ?((education_monthly+insurance_monthly-child_subsidy_monthly)*100+food_monthly()+clothing_monthly)*MONTHS_PER_YEAR*CHILDHOOD_YEARS:0}
let child_care_hours_per_day = 10;
let total_child_care_hours =()=>{return toggles["toggle_child"] ==1? CHILDHOOD_YEARS*child_care_hours_per_day*DAYS_PER_YEAR:0};
let old_qphone_last_years = 2;
let qphone_cost = 999;
let first_qphone_age = 21;
let total_number_of_qphones = () => { return Math.ceil((max_age - first_qphone_age) / old_qphone_last_years) };
let total_qphone_cost = () => { return toggles["toggle_qphone"] == 1 ? total_number_of_qphones() * qphone_cost : 0 };
let age_bought_big_city_apartment = 40;
let cost_big_city = 90;
let size_big_city = 20;
let total_cost_big_city = () => { return toggles["toggle_big_city"] == 1 ? cost_big_city * 100 * size_big_city * 100 : 0 }
let age_bought_small_city_house = 35;
let cost_small = 0.5;
let size_small = 20;
let total_cost_small = () => { return toggles["toggle_small_city"] == 1 ? cost_small * 1000 * size_small * 100 : 0 }
let each_car_cost = 10;
let gas_monthly = 2;
let garage_monthly = 2;
let car_longevity = 20;
let first_car_age = 25;
let total_car_number = () => { return Math.ceil((max_age - first_car_age) / car_longevity) };
let total_car_cost = () => { return toggles["toggle_cars"] == 1 ? total_car_number() * each_car_cost * 1000 + (gas_monthly + garage_monthly) * 100 * (max_age - first_car_age) * MONTHS_PER_YEAR : 0 };
let bitcoin_buy = 4;
let bitcoin_fold = 10;
let number_of_bitcoin_bought = 2;
let bitcoin_sell = () => { return bitcoin_buy * bitcoin_fold };
let bitcoin_profit = () => { return toggles["toggle_bitcoin"] == 1 ? (bitcoin_sell() - bitcoin_buy) * number_of_bitcoin_bought * 1000 : 0 };
let vacation_every_x_year = 2;
let vacation_days = 5;
let vacation_hotel_cost = 4;
let vacation_food_cost = 4;
let vacation_entertainment_cost = 3;
let vacation_transportation_cost = 1;
let vacation_airplane_cost = 10;
let first_vacation_age = 30
let too_old_to_travel_age = ()=>{return max_age-5};
let number_of_vacation_trips = ()=>{return Math.floor((too_old_to_travel_age()-first_vacation_age)/vacation_every_x_year)};
let total_vacation_cost = ()=>{return toggles["toggle_vacations"] == 1? ((vacation_hotel_cost+vacation_food_cost+vacation_entertainment_cost+vacation_transportation_cost)*100*vacation_days+vacation_airplane_cost*100)*number_of_vacation_trips():0}
let total_vacation_hours = ()=> { return toggles["toggle_vacations"]==1?(HOURS_PER_DAY-food_hours-sleep_hours-commute_hours)*vacation_days*number_of_vacation_trips():0}
let age_quit_job = 36;
let startup_hours_per_day = 12;
let startup_work_days_per_week = 7;
let startup_escape_days_per_year = 7;
let startup_initial_investment_in_millions = 0.5;
let startup_no_profit_years = 7;
let startup_start_profit_year = ()=>{return startup_no_profit_years+1};
let startup_income_in_thousands = 300;
let startup_retire_age = ()=>{return max_age-15};
let startup_working_years = ()=>{return startup_retire_age()-age_quit_job};
let startup_income_years = ()=>{return max_age-age_quit_job-startup_no_profit_years};
let startup_total_hours = ()=>{return toggles["toggle_startup"] == 1?startup_hours_per_day*(WEEKS_PER_YEAR*startup_work_days_per_week-startup_escape_days_per_year)*startup_working_years():0};
let startup_total_cost = ()=>{return toggles["toggle_startup"] == 1?startup_initial_investment_in_millions*1000*1000:0};
let startup_total_income = ()=>{return toggles["toggle_startup"] == 1?startup_income_in_thousands*1000*startup_income_years():0};
let total_income = () => { return lifetime_work_income() + total_retirement_income() + bitcoin_profit() + startup_total_income() }
let cash_left = () => {
  let balance = total_income();
  for (let key in lifelong_cost) {
    if (key != "Money left") {
      // console.log(`${key}:${lifelong_cost[key]()}`);  
      balance -= lifelong_cost[key]();
    }
  }
  return balance;
}
// ************
//  chart data
// ************
let hours_used = {
  "Work": total_work_hours,
  "Sleep": () => { return daily2Lifetime(sleep_hours) },
  "Food": () => { return daily2Lifetime(food_hours) },
  "Commute": () => { return daily2Lifetime(commute_hours) },
  "Study": total_study_hours,
  "Video games":total_video_game_hours,
  "A long-lasting relationship":total_long_last_relationship_hours,
  "Dating apps":total_dating_apps_hours,
  "Social media":total_social_media_hours,
  "Lifelong learner":total_lifelong_learning_hours,
  "First relationship":first_relationship_total_hours,
  "Sports": total_sports_hours,
  "Vacations": total_vacation_hours,
  "Start a company":startup_total_hours,
  "Raise a child":total_child_care_hours,
  "Free time": hours_left
}

let lifelong_cost = {
  "Rent": rent_lifetime_cost,
  "Public transportation": () => { return monthly2Lifetime(public_transportation_monthly) },
  "Food": () => { return monthly2Lifetime(food_monthly()) },
  "Health insurance": () => { return monthly2Lifetime(insurance_monthly) },
  "Wireless and Internet": () => { return monthly2Lifetime(wireless_internet_monthly) },
  "Clothing": () => { return monthly2Lifetime(clothing_monthly) },
  "Tax": tax_lifetime,
  "Retirement account": retirement_cost_lifetime,
  "Alcohol": () => { return toggles["toggle_alcoholic"] == 1 ? monthly2Lifetime(drink_monthly()) : 0 },
  "QPhones": total_qphone_cost,
  "An apartment in a big city": total_cost_big_city,
  "A house in a small city": total_cost_small,
  "Cars": total_car_cost,
  "A child": total_child_cost,
  "Vacations":total_vacation_cost,
  "Start a company": startup_total_cost,
  "Money left": cash_left
}


// ************
//  lines
// ************
let lines = [
  `How will you spend your life, if you know that your life will only have ${dependent( "total_hours")} hours?`,

  `You started working since you were ${clickable( "work_start_age")}, retired at the age of ${clickable( "work_end_age")}; that's ${dependent( "work_years")} working years. Your retirement lasted ${dependent( "retirement_years")} years.`,

  `You worked ${clickable( "work_hours_per_day")} hours per day ${clickable( "work_days_per_week")} days a week. You had ${clickable( "paid_holidays")} days of paid holidays per year. Besides, you did not need to work on the ${clickable( "national_holidays")} national holidays. In total, you spent ${dependent( "work_percent")} percent of your life working.`,

  `You slept on average ${clickable( "sleep_hours")} hours per day. That took ${dependent( "sleep_percent")} percent of your life.`,

  `You ate for ${clickable( "food_hours")} hours per day. That's ${dependent("food_hours_in_years")} years of eating time given you lived ${clickable( "max_age")} years.`,

  `Commuting took ${clickable( "commute_hours")} hours per day.`,

  `So on a typical workday, food, commute, work, and sleep occupied ${dependent( "four_things_combined_percentage")} percent of your day. That means you had ${dependent( "work_day_hours_left")} hours left to do your laundry, hike in a park, watch a movie, play with your phone, walk your dogs, play with your cats, look at your plants, work out in a gym, read, or listen to music.`,

  `When you were a student, you studied ${clickable( "morning_study_hour")} hours in the morning, ${clickable( "afternoon_study_hour")} hours in the afternoon and ${clickable( "evening_study_hour")} hours in the evening. That's ${dependent( "total_study_hour_per_day")} hours per day. That's roughly the schedule from 1st grade to 12th grade and in college (4 years).`,

  `When you were a student, each summer vacation lasted ${clickable("summer_vacation")} days and each winter vacation lasted ${clickable("winter_vacation")} days. During the vacations, you studied ${clickable("vacation_study_hours")} hours per day.`,

  `${toggle("Video games", "toggle_video_games")}: <span class='toggle_content'>You started to play video games since you were ${clickable( "video_game_start_age")}. When you were young, your parents allowed you to play 1 hour per day. But you managed to play ${clickable( "actual_play_time")} hours per day.<br><br></span>

<span class='toggle_content'>Strangely enough, you did not play video games much while you were in college. However, after you graduated from college because you needed to entertain yourself while not working, you played video games for about ${clickable( "play_time_after_working")} hour on a daily basis. That's a total of ${dependent( "total_video_game_hours")} hours in your lifetime.</span>`,

  `${toggle("Dating apps", "toggle_dating_apps")}: <span class='toggle_content'>When you were between the age of ${clickable( "dating_apps_start_age")} and ${clickable( "dating_apps_end_age")}, because you were single, and due to the digital culture of the time, and a lack of opportunity to meet new people in real life, you spent on average ${clickable( "dating_apps_daily_time")} hours per day on dating apps.</span>`,

  `${toggle("A Long-lasting relationship", "toggle_love")}:<span class='toggle_content'> You found the love of your life when you were ${clickable( "fall_in_love_age")}, and since then you spent ${clickable( "long_last_relationship_hours_per_day")} hours with the person daily. Major activities include: eating, sleeping, talking, making plans, helping each other out and etc.</span>`,

  `${toggle("Social media", "toggle_social_media")}: <span class='toggle_content'>Qbook, Qgram, Qter, and Qchat were the most popular social media sites. You spent ${dependent( "total_social_media_hours")} hours on those sites since they appeared since you were ${clickable( "age_social_media_appeared")}. That's an average of ${clickable( "social_media_hours_per_day")} hours per day. You gave up social media at the age of ${clickable( "social_media_give_up_age")}, that gave you a lot of time to do other things.</span>`,

  `${toggle("Lifelong learning", "toggle_lifelong_learning")}: <span class='toggle_content'>Life became repetitive and boring soon after you graduated from college. However, one day when you were ${clickable( "age_rediscovered_learning")}, you rediscovered the glamor of learning. When you study, you always meet new and exciting things! That's exactly what you needed in life: motion and liveliness.<br><br></span>

<span class='toggle_content'>Since the moment of realization, you studied on average ${clickable( "lifelong_study_hour_per_day")} hours per day and became a lifelong learner worthy of the name.</span>`,

  `${toggle('First relationship', "toggle_first_relationship")}: <span class='toggle_content'>Your first lovely relationship lasted for about ${clickable( "first_relationship_months")} months. You spent ${clickable( "first_relationship_hours_per_day")} hours per day together. Though it's like a small droplet in the ocean of life, you remembered it.</span>`,

  `${toggle("Sports","toggle_sports")}: <span class='toggle_content'>City life can be quite sedentary. You were gaining weight. Playing sports lifts your mood, helps you sleep better, releases stress and makes you more energetic. You had ${clickable("sports_session_per_week")} sports sessions per week. Each session lasted for about ${clickable("sports_hours_per_session")} hours. Your first session began when you were ${clickable("first_sports_age")}, and you became too old to play sports at the age of ${dependent("too_old_to_play_sports_age")}.</span>`

];
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@          
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
//       @@@@@@@@@          @@@@@@@@@@@   
//       @@@@@@@@@            @@@@@@@@@(  
//       @@@@@@@@@            @@@@@@@@@@  
//       @@@@@@@@@            @@@@@@@@@   
//       @@@@@@@@@          @@@@@@@@@@    
//       @@@@@@@@@@@@@@@@@@@@@@@@@@@      
//       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
//       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
//       @@@@@@@@@             @@@@@@@@@@@
//       @@@@@@@@@              ,@@@@@@@@@
//       @@@@@@@@@               @@@@@@@@@
//       @@@@@@@@@              ,@@@@@@@@@
//       @@@@@@@@@             @@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@. 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
//           @@@@@    @@@@@               
let lines2 = [`Your hourly rate was ${clickable( "hourly_rate")} dollars. Your monthly income was ${dependent( "monthly_income")} dollars. During the working years, you earned ${dependent( "lifetime_work_income")} dollars.`,

`While working, you contributed ${clickable( "retirement_saving_percentage")} percent of your monthly income (${dependent( "retirement_monthly_cost")} dollars) to your retirement account.`,

`Your monthly income tax was ${dependent( "tax_monthly")} dollars. (You start paying income tax after deducting ${clickable( "tax_start_point")} thousand dollars from your monthly income. The tax rate was ${clickable( "tax_percentage")} percent.)`,

`After you retired, you got a retirement income of ${dependent( "retirement_income_monthly")} dollars per month. That's ${clickable( "retirement_income_percentage")} percent of your working income.`,

`The average cost of each meal was ${clickable( "each_meal_cost")} dollars. You ate ${clickable( "meals_per_day")} meals per day. That's ${dependent( "food_monthly")} dollars per month.`,

`The rent per month was ${clickable( "rent_monthly_in_hundreds")} hundred dollars.`,

`Your health insurance was ${clickable( "insurance_monthly")} hundred dollars per month. That accumulated to ${dependent( "insurance_lifetime")} dollars for your lifetime.`,

`Public transportation costs ${clickable( "public_transportation_monthly")} dollars per month.`,

`Wireless and Internet cost ${clickable( "wireless_internet_monthly")} dollars per month.`,

`The clothing cost ${clickable( "clothing_monthly")} dollars per month.`,

`${toggle("Alcohol", "toggle_alcoholic")}: <span class='toggle_content'>To cure sadness and celebrate happiness, you drank ${clickable( "drinks_per_day")} alcohol per day, and each alcohol cost ${clickable( "cost_per_drink")} dollars. So the total cost of drinks was ${dependent( "drink_monthly")} dollars per month.</span>`,

`${toggle("QPhones", "toggle_qphone")}: <span class='toggle_content'>QPhone was the phone to have during your lifetime. You switched to the newest QPhone every ${clickable( "old_qphone_last_years")} years. Each QPhone cost ${clickable( "qphone_cost")} dollars. You got your first QPhone when you were ${clickable( "first_qphone_age")}. You had ${dependent("total_number_of_qphones")} QPhones in total. And they cost ${dependent( "total_qphone_cost")} dollars.</span>`,

`${toggle("A house in a small city", "toggle_small_city")}: <span class='toggle_content'> When you were ${clickable("age_bought_small_city_house")}, you bought a house in a small city. The cost per square foot was ${clickable( "cost_small")} hundred dollars. The size of your apartment was ${clickable( "size_small")} hundred square feet. The total cost of the apartment was ${dependent( "total_cost_small")} dollars.</span>`,

`${toggle("An apartment in a big city", "toggle_big_city")}: <span class='toggle_content'> When you were ${clickable("age_bought_big_city_apartment")}, you bought an expensive apartment in Q City. The cost per square foot was ${clickable( "cost_big_city")} hundred dollars. The size of your apartment was ${clickable( "size_big_city")} hundred square feet. The total cost of the apartment was ${dependent( "total_cost_big_city")} dollars.</span>`,

`${toggle("Cars", "toggle_cars")}: <span class="toggle_content">Unlike New York City where you mainly rely on taking subways to move around, you lived in a place where buying a car was necessary. Each car cost ${clickable( "each_car_cost")} thousand dollars. The monthly cost of gasoline was ${clickable( "gas_monthly")} hundred dollars. Having a garage cost another ${clickable( "garage_monthly")} hundred dollars per month. The car lasted ${clickable( "car_longevity")} years. So in your lifetime, since you got your first car when you were ${clickable( "first_car_age")}, you bought ${dependent( "total_car_number")} cars in total and they cost ${dependent( "total_car_cost")} dollars.</span>`,

`${toggle("Raising a child","toggle_child")}: 
<span class='toggle_content'>Raising a child was an expensive business. Before the child turned 18, each month, you spent another ${dependent("food_monthly")} dollars on food, another ${dependent("insurance_monthly_dependent" )} hundred dollars on health insurance, another ${dependent("clothing_monthly_dependent")} dollars on clothing, extra ${clickable( "education_monthly")} hundred dollars on education. However, you got a subsidy of ${clickable("child_subsidy_monthly")} hundred dollars per month because you had a child. So raising a child to the age of ${CHILDHOOD_YEARS} costs ${dependent("total_child_cost")} dollars.<br><br></span>

<span class='toggle_content'>Before the child turned ${CHILDHOOD_YEARS}, you spent on average ${clickable("child_care_hours_per_day")} hours per day on taking care of the child. That's a total of ${dependent("total_child_care_hours")} hours.</span>
`,

`${toggle("Vacations","toggle_vacations")}: 
<span class='toggle_content'>As the saying goes, the grass is greener on the other side. After living in the same city for years, you wanted to leave your home and seek adventures elsewhere.<br><br></span>

<span class='toggle_content'>You visited a new country every ${clickable("vacation_every_x_year")} years. Each vacation lasted for about ${clickable("vacation_days")} days. Every day you spent ${clickable("vacation_hotel_cost")} hundred dollars on hotel, ${clickable("vacation_food_cost")} hundred dollars on food, ${clickable("vacation_entertainment_cost")} hundred dollars on entertainment, ${clickable("vacation_transportation_cost")} hundred dollars on transportation. And a round-trip ticket to that country cost ${clickable("vacation_airplane_cost")} hundred dollars. You had the first one of these trips when you were ${clickable("first_vacation_age")}. And you became too old to travel at the age of ${dependent("too_old_to_travel_age")}. So you had ${dependent("number_of_vacation_trips")} these trips during your lifetime.</span>`,

`${toggle("Start a company","toggle_startup")}: 
<span class='toggle_content'>People say that starting a company is like riding a roller coaster. You quitted your job at the age of ${clickable("age_quit_job")} and became a full-time entrepreneur. Since founding your company, you worked ${clickable("startup_hours_per_day")} hours a day, ${clickable("startup_work_days_per_week")} days a week.<br><br></span>

<span class='toggle_content'>You suffered burnout. You had to escape for ${clickable("startup_escape_days_per_year")} days every year in order to renew yourself.<br><br></span>

<span class='toggle_content'>The initial investment was ${clickable("startup_initial_investment_in_millions",0.1)} million dollars. For the first ${clickable("startup_no_profit_years")} years, though you did not make any money, you did not lose much money either. Since the ${dependent("startup_start_profit_year")}th year, things got better; you brought home ${clickable("startup_income_in_thousands")} thousand dollars per year on average.<br><br></span>

<span class='toggle_content'>The startup was your life's work. You retired from running the business at the age of ${dependent("startup_retire_age")} and let other people run the business. Since you have an ownership in the company, you still enjoy the same income after you retired.</span>`
];
