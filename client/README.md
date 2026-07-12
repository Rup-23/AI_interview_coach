## AI Interview Coach 
```
An AI-powered Interview Preparation Platform built with the MERN Stack. Users can upload their resumes, receive AI-generated interview questions based on their profile, answer them, and get personalized feedback.
```


## Mongoose `pre("save")` Middleware (`next()` No Longer Required)

### Problem

While implementing password hashing with Mongoose's `pre("save")` middleware, I initially followed an older tutorial that used the `next()` callback inside an asynchronous middleware function.



This resulted in the following runtime error:

```text
TypeError: next is not a function
```

### Cause

The code was written using an older Mongoose middleware pattern. In **Mongoose v8+**, asynchronous middleware is Promise-based, so Mongoose automatically waits for the `async` function to finish. The `next()` callback is no longer required in most async middleware.

### Solution

I removed the `next` parameter and allowed the middleware to complete naturally.


### Project 
```
Resume is analyzed to personalize the interview and measure alignment with the selected role. The AI adjusts the interview strategy based on how closely the resume matches the target role, instead of generating generic questions.
```