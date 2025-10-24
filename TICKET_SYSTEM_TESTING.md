# AI Ticket System - Testing Guide

## Overview
This document outlines how to test the complete AI-powered ticket system workflow.

## System Architecture

### Backend Flow
1. **User creates ticket** → `POST /api/tickets`
2. **Ticket saved to DB** → MongoDB with status "TODO"
3. **Event sent to Inngest** → `ticket/created` event
4. **Inngest processes ticket**:
   - Fetches ticket from DB
   - Runs AI analysis using Gemini
   - Updates ticket with AI insights (priority, skills, notes)
   - Assigns to moderator based on skills
   - Sends email notification
   - Updates status to "IN_PROGRESS"

### Frontend Flow
1. **User Dashboard** → Create and view own tickets
2. **Moderator Dashboard** → View assigned tickets with stats
3. **Admin Dashboard** → Manage all users and tickets
4. **Ticket Details** → View AI analysis and moderator can provide solution

## Testing Checklist

### ✅ 1. Ticket Creation (User Role)
- [ ] Login as a regular user
- [ ] Navigate to Tickets page
- [ ] Click "Create New Ticket"
- [ ] Try to submit with:
  - [ ] Empty title (should fail with validation)
  - [ ] Title < 5 characters (should fail with validation)
  - [ ] Empty description (should fail with validation)
  - [ ] Description < 10 characters (should fail with validation)
- [ ] Submit valid ticket with:
  - Title: "React component not rendering"
  - Description: "I'm having trouble with a React component. It's not displaying on the page even though the data is being fetched correctly."
- [ ] Verify success message appears
- [ ] Verify ticket appears in the list

### ✅ 2. AI Processing (Backend)
Check the backend logs for the following:
- [ ] "✅ Ticket created successfully" message
- [ ] "✅ Ticket sent to Inngest for processing"
- [ ] "✅ Fetched ticket: [title]"
- [ ] "🤖 Starting AI analysis for ticket"
- [ ] "✅ AI analysis completed" with priority and skills
- [ ] "✅ Updated ticket with AI insights"
- [ ] "✅ Assigned ticket to [email]"
- [ ] "✅ Email sent to [email]"

### ✅ 3. Ticket Details View (User Role)
- [ ] Click on the created ticket
- [ ] Verify the following are displayed:
  - [ ] Title
  - [ ] Description
  - [ ] Status badge (should be "IN_PROGRESS")
  - [ ] Priority badge (determined by AI)
  - [ ] Created by information
  - [ ] Assigned to information
  - [ ] Related Skills (determined by AI)
  - [ ] AI Generated Notes section
- [ ] Verify user CANNOT edit status or add solution (not a moderator)

### ✅ 4. Moderator Assignment
- [ ] Login as moderator
- [ ] Navigate to Moderator Panel
- [ ] Verify dashboard shows:
  - [ ] Total Assigned count
  - [ ] Pending count
  - [ ] In Progress count
  - [ ] Resolved count
- [ ] Verify the ticket is in the list
- [ ] Verify ticket shows:
  - [ ] Title and description
  - [ ] Status and priority badges
  - [ ] Related skills
  - [ ] Created by user email

### ✅ 5. Ticket Resolution (Moderator Role)
- [ ] Click on assigned ticket
- [ ] Verify you can see:
  - [ ] All ticket details
  - [ ] AI Generated Notes
  - [ ] Solution textarea (editable)
  - [ ] Status dropdown (editable)
- [ ] Try to mark as "RESOLVED" without solution:
  - [ ] Verify confirmation dialog appears
- [ ] Add a solution:
  ```
  The issue was caused by a missing return statement in your component. 
  Here's the fix:
  
  ```jsx
  function MyComponent() {
    const data = fetchData();
    return <div>{data}</div>; // Add this return
  }
  ```
  
  This should resolve your rendering issue.
  ```
- [ ] Change status to "RESOLVED"
- [ ] Click "Update Ticket"
- [ ] Verify success message appears
- [ ] Verify ticket status updates

### ✅ 6. Ticket Solution View (User Role)
- [ ] Login back as the user who created the ticket
- [ ] Navigate to Tickets page
- [ ] Verify ticket now shows "RESOLVED" status
- [ ] Click on the ticket
- [ ] Verify:
  - [ ] Status shows "RESOLVED"
  - [ ] Solution is displayed
  - [ ] Solution is properly formatted (markdown rendered)
  - [ ] User CANNOT edit the solution

### ✅ 7. Admin Functionality
- [ ] Login as admin
- [ ] Navigate to Admin Panel
- [ ] Verify you can see all users
- [ ] Edit a user:
  - [ ] Change role to "moderator"
  - [ ] Add skills: "React, Node.js, MongoDB"
  - [ ] Save changes
- [ ] Navigate to Tickets page
- [ ] Verify admin can see ALL tickets (not just their own)
- [ ] Click on any ticket
- [ ] Verify admin can:
  - [ ] Update status
  - [ ] Add/edit solution
  - [ ] View all details

### ✅ 8. Error Handling
Test the following error scenarios:

#### Backend Errors
- [ ] Create ticket when server is down (should show connection error)
- [ ] Create ticket with invalid token (should return 401)
- [ ] Moderator tries to update ticket not assigned to them (should return 404)
- [ ] User tries to update ticket (should return 403)

#### Frontend Validation
- [ ] Create ticket with short title (client-side validation)
- [ ] Create ticket with short description (client-side validation)
- [ ] Update ticket status without selecting value
- [ ] Mark as resolved without solution (confirmation dialog)

#### AI Processing Failures
- [ ] Check logs when AI parsing fails (should use fallback values)
- [ ] Verify ticket doesn't get stuck (status updated even on failure)
- [ ] Verify fallback assignment to admin if no moderator found

### ✅ 9. Email Notifications
- [ ] Check email service (Mailtrap/configured service)
- [ ] Verify email sent when ticket assigned
- [ ] Verify email contains:
  - [ ] Ticket title
  - [ ] Priority
  - [ ] Related skills
  - [ ] Professional message

### ✅ 10. Permissions Testing

#### User Permissions
- [ ] Can create tickets ✓
- [ ] Can view own tickets ✓
- [ ] Cannot view other users' tickets ✓
- [ ] Cannot update tickets ✓
- [ ] Cannot access admin panel ✓
- [ ] Cannot access moderator panel ✓

#### Moderator Permissions
- [ ] Can view tickets assigned to them ✓
- [ ] Can update assigned tickets ✓
- [ ] Cannot update tickets not assigned to them ✓
- [ ] Cannot view all tickets ✓
- [ ] Cannot access admin panel ✓

#### Admin Permissions
- [ ] Can view all tickets ✓
- [ ] Can update any ticket ✓
- [ ] Can access admin panel ✓
- [ ] Can update user roles and skills ✓

## Expected Results

### Successful Ticket Lifecycle
1. ✅ User creates ticket
2. ✅ Ticket saved with status "TODO"
3. ✅ AI analyzes ticket (priority, skills, notes)
4. ✅ Ticket updated to "IN_PROGRESS" with AI insights
5. ✅ Moderator assigned based on skills
6. ✅ Email notification sent
7. ✅ Moderator reviews and provides solution
8. ✅ Ticket marked as "RESOLVED"
9. ✅ User sees solution

### AI Analysis Expected Output
For a ticket about React issues, AI should provide:
- **Priority**: medium or high
- **Skills**: ["React", "JavaScript", "Frontend"]
- **Notes**: Detailed technical explanation with potential solutions
- **Summary**: Brief description of the issue

### Error Recovery
- AI parsing fails → Fallback values used
- No matching moderator → Assigned to any moderator or admin
- Email fails → Logged but doesn't block ticket processing
- Inngest fails → Ticket remains in TODO status for manual processing

## Common Issues and Solutions

### Issue: AI parsing always fails
**Solution**: Check `GEMINI_API_KEY` is set correctly in `.env`

### Issue: No moderator assigned
**Solution**: Ensure at least one user has role "moderator" with skills matching ticket

### Issue: Email not sent
**Solution**: Check Mailtrap credentials in `.env`:
- `MAILTRAP_SMTP_HOST`
- `MAILTRAP_SMTP_PORT`
- `MAILTRAP_SMTP_USER`
- `MAILTRAP_SMTP_PASS`

### Issue: Ticket stuck in TODO
**Solution**: Check Inngest dashboard or logs for processing errors

### Issue: Frontend can't fetch tickets
**Solution**: Verify `VITE_SERVER_URL` in frontend `.env` points to correct backend URL

## Environment Variables Checklist

### Backend (.env)
```
MONGO_URI=mongodb://...
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-key
MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your-user
MAILTRAP_SMTP_PASS=your-pass
PORT=3000
```

### Frontend (.env)
```
VITE_SERVER_URL=http://localhost:3000/api
```

## Testing Tips

1. **Use Browser DevTools**: Monitor network requests and console logs
2. **Check Backend Logs**: Watch terminal for processing steps
3. **Use Postman/Thunder Client**: Test API endpoints directly
4. **Test Edge Cases**: Empty values, special characters, very long text
5. **Test Permissions**: Login as different user roles
6. **Monitor Database**: Check MongoDB to verify data updates
7. **Check Inngest Dashboard**: View event processing status

## Success Metrics

- ✅ All tickets get AI analysis within 5 seconds
- ✅ 100% of tickets assigned to appropriate moderator
- ✅ Email notifications sent within 10 seconds
- ✅ No tickets stuck in processing
- ✅ All permissions properly enforced
- ✅ All error states handled gracefully
- ✅ User feedback clear and helpful

## Next Steps After Testing

If all tests pass:
1. ✅ System is production-ready
2. Consider adding more features:
   - Ticket comments/discussion
   - File attachments
   - Ticket categories
   - SLA tracking
   - Analytics dashboard
   - User notifications (in-app)
   - Ticket priority override
   - Bulk ticket operations
