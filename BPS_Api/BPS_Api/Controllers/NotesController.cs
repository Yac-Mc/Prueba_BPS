using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BPS_Api.Models;

namespace BPS_Api.Controllers
{
    public class NotesController : ApiController
    {
        private YacEntities db = new YacEntities();

        // GET: api/Notes
        public IQueryable<Note> GetNote()
        {
            return db.Note;
        }

        // GET: api/Notes/5
        [ResponseType(typeof(Note))]
        public IHttpActionResult GetNote(int id)
        {
            Note note = db.Note.Find(id);
            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        // PUT: api/Notes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNote(int id, Note note)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != note.Id)
            {
                return BadRequest();
            }

            db.Entry(note).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw ex;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Notes
        [ResponseType(typeof(Note))]
        public IHttpActionResult PostNote(Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Note.Add(note);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = note.Id }, note);
        }

        // DELETE: api/Notes/5
        [ResponseType(typeof(Note))]
        public IHttpActionResult DeleteNote(int id)
        {
            Note note = db.Note.Find(id);
            if (note == null)
            {
                return NotFound();
            }

            db.Note.Remove(note);
            db.SaveChanges();

            return Ok(note);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NoteExists(int id)
        {
            return db.Note.Count(e => e.Id == id) > 0;
        }
    }
}