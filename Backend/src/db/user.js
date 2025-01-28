import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // More flexible email regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
}, { timestamps: true });

// Add a pre-save validation hook
userSchema.pre('save', function(next) {
  const errors = [];

  if (this.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (errors.length > 0) {
    const validationError = new mongoose.Error.ValidationError(null);
    errors.forEach(errorMsg => {
      validationError.addError('password', new mongoose.Error.ValidatorError({
        message: errorMsg
      }));
    });
    return next(validationError);
  }

  next();
});

const User = mongoose.model('users', userSchema);

export default User;